<template>
  <section ref="sectionRef" class="features-section">
    <div ref="sceneHostRef" class="features-scene" aria-hidden="true"></div>
    <div class="container">
      <div class="features-header">
        <ScrollColorText
          as="div"
          class="features-subtitle"
          color1="#ebebeb34"
          color2="#72c2ff"
        >
          {{ $t('features.subtitle') }}
        </ScrollColorText>
        <ScrollColorText as="h2" color1="#ebebeb34" color2="#ffffff">
          {{ $t('features.title') }}
        </ScrollColorText>
        <ScrollColorText
          as="p"
          class="features-description"
          color1="#ebebeb34"
          color2="#ffffff"
        >
          <span v-html="$t('features.desc')"></span>
        </ScrollColorText>
      </div>
      <div class="features-list">
        <div v-for="(item, idx) in featureItems" :key="idx" class="feature-item">
          <div class="feature-icon"><img :src="item.icon"></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
      <p class="model-credit">
        模型制作：<span class="model-credit__noah">Noah</span><span class="model-credit__chen">Chen</span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'

const { t } = useI18n()
const sectionRef = ref(null)
const sceneHostRef = ref(null)

const BASE_ORBIT_ANGLE = -0.45
const AUTO_ORBIT_SPEED = 0.12
const SCROLL_ORBIT_SPAN = Math.PI
const SCROLL_ORBIT_FOLLOW = 5
const MODEL_SIZE = 2.8
const MODEL_Y_OFFSET = -0.2

let renderer = null
let composer = null
let camera = null
let modelRoot = null
let cameraRadius = 6.8
let resizeObserver = null
let intersectionObserver = null
let motionQuery = null
let clock = null
let animationFrame = 0
let autoOrbitAngle = 0
let scrollOrbitAngle = 0
let lastRenderedAngle = null
let prefersReducedMotion = false
let sceneActive = false
const disposableResources = []
const disposablePasses = []

const featureItems = computed(() =>
  [0, 1, 2, 3].map((i) => ({
    icon: `/img/features/${i + 1}.svg`,
    title: t(`features.items.${i}.title`),
    desc: t(`features.items.${i}.desc`),
  }))
)

function resizeScene() {
  const host = sceneHostRef.value
  if (!host || !renderer || !composer || !camera) return

  const width = host.clientWidth
  const height = host.clientHeight
  if (!width || !height) return

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  camera.aspect = width / height
  cameraRadius = width < 640 ? 7.6 : 6.8
  camera.updateProjectionMatrix()

  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height, false)
  composer.setPixelRatio(pixelRatio)
  composer.setSize(width, height)
}

function readScrollOrbitAngle() {
  const section = sectionRef.value
  if (!section) return scrollOrbitAngle

  const rect = section.getBoundingClientRect()
  const travel = rect.height + window.innerHeight
  const progress = Math.min(Math.max((window.innerHeight - rect.top) / travel, 0), 1)
  return progress * SCROLL_ORBIT_SPAN
}

function updateScene(delta) {
  if (!camera || !modelRoot || !composer) return

  if (!prefersReducedMotion) autoOrbitAngle += delta * AUTO_ORBIT_SPEED

  const targetScrollAngle = readScrollOrbitAngle()
  const follow = delta > 0 ? 1 - Math.exp(-SCROLL_ORBIT_FOLLOW * delta) : 1
  scrollOrbitAngle += (targetScrollAngle - scrollOrbitAngle) * follow

  const orbitAngle = BASE_ORBIT_ANGLE + autoOrbitAngle + scrollOrbitAngle
  if (lastRenderedAngle !== null && Math.abs(orbitAngle - lastRenderedAngle) < 1e-4) return

  camera.position.set(
    Math.sin(orbitAngle) * cameraRadius,
    2.4,
    Math.cos(orbitAngle) * cameraRadius,
  )
  camera.lookAt(modelRoot.position)
  composer.render()
  lastRenderedAngle = orbitAngle
}

function animateScene() {
  animationFrame = window.requestAnimationFrame(animateScene)
  updateScene(Math.min(clock.getDelta(), 0.1))
}

function startSceneLoop() {
  if (animationFrame || !composer) return

  scrollOrbitAngle = readScrollOrbitAngle()
  clock.start()
  animationFrame = window.requestAnimationFrame(animateScene)
}

function stopSceneLoop() {
  if (!animationFrame) return

  window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
  clock.stop()
}

function handleMotionPreference(event) {
  prefersReducedMotion = event.matches
}

function disposeModel(model) {
  const geometries = new Set()
  const materials = new Set()
  const textures = new Set()

  model.traverse((object) => {
    if (!object.isMesh) return

    if (object.geometry && !geometries.has(object.geometry)) {
      geometries.add(object.geometry)
      object.geometry.dispose()
    }

    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material]
    objectMaterials.forEach((material) => {
      if (!material || materials.has(material)) return

      materials.add(material)
      Object.values(material).forEach((value) => {
        if (value?.isTexture && !textures.has(value)) {
          textures.add(value)
          value.dispose()
        }
      })
      material.dispose()
    })
  })
}

function loadModel() {
  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)

  loader.load(
    '/three/miemie.glb',
    (gltf) => {
      if (!sceneActive || !modelRoot) {
        disposeModel(gltf.scene)
        return
      }

      const model = gltf.scene
      const bounds = new THREE.Box3().setFromObject(model)
      const size = bounds.getSize(new THREE.Vector3())
      const center = bounds.getCenter(new THREE.Vector3())
      const maxDimension = Math.max(size.x, size.y, size.z)

      if (!maxDimension) {
        disposeModel(model)
        return
      }

      const scale = MODEL_SIZE / maxDimension
      const normalizedModel = new THREE.Group()
      normalizedModel.add(model)
      normalizedModel.scale.setScalar(scale)
      normalizedModel.position.set(
        -center.x * scale,
        -center.y * scale + MODEL_Y_OFFSET,
        -center.z * scale,
      )
      modelRoot.add(normalizedModel)
      lastRenderedAngle = null
      if (!animationFrame) updateScene(0)
    },
    undefined,
    (error) => {
      console.error('Failed to load features model.', error)
    },
  )
}

function createScene() {
  const host = sceneHostRef.value
  if (!host) return

  sceneActive = true
  clock = new THREE.Clock(false)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x121212)

  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 2.4, cameraRadius)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  host.appendChild(renderer.domElement)

  modelRoot = new THREE.Group()
  scene.add(modelRoot)
  loadModel()

  const grid = new THREE.GridHelper(24, 48, 0xffffff, 0xffffff)
  grid.position.y = -0.68
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material]
  gridMaterials.forEach((gridMaterial) => {
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.1
    gridMaterial.depthWrite = false
  })
  scene.add(grid)
  disposableResources.push(grid.geometry, ...gridMaterials)

  scene.add(new THREE.HemisphereLight(0x9dd7ff, 0x111827, 1.35))
  const keyLight = new THREE.DirectionalLight(0xfff4dd, 2.1)
  keyLight.position.set(3.5, 4.5, 4)
  scene.add(keyLight)
  const fillLight = new THREE.PointLight(0x397fff, 8, 13, 2)
  fillLight.position.set(-3.5, 1.5, 3)
  scene.add(fillLight)
  const rimLight = new THREE.PointLight(0x65d6ff, 7, 11, 2)
  rimLight.position.set(2, 1, -3.5)
  scene.add(rimLight)

  const sampleCount = Math.min(
    window.innerWidth < 640 ? 2 : 4,
    renderer.capabilities.maxSamples,
  )
  const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: sampleCount,
  })
  composer = new EffectComposer(renderer, renderTarget)
  const renderPass = new RenderPass(scene, camera)
  const smaaPass = new SMAAPass()
  const outputPass = new OutputPass()
  disposablePasses.push(renderPass, smaaPass, outputPass)
  composer.addPass(renderPass)
  composer.addPass(smaaPass)
  composer.addPass(outputPass)

  resizeObserver = new ResizeObserver(() => {
    resizeScene()
    lastRenderedAngle = null
    if (!animationFrame) updateScene(0)
  })
  resizeObserver.observe(host)

  resizeScene()
  updateScene(0)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionPreference)

  createScene()

  const section = sectionRef.value
  if (!section) return

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) startSceneLoop()
      else stopSceneLoop()
    },
    { rootMargin: '10% 0px' },
  )
  intersectionObserver.observe(section)
})

onUnmounted(() => {
  sceneActive = false
  stopSceneLoop()
  motionQuery?.removeEventListener('change', handleMotionPreference)
  intersectionObserver?.disconnect()
  resizeObserver?.disconnect()

  disposableResources.forEach((resource) => resource.dispose())
  disposableResources.length = 0
  if (modelRoot) disposeModel(modelRoot)
  disposablePasses.forEach((pass) => pass.dispose())
  disposablePasses.length = 0
  composer?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss()
  renderer?.domElement.remove()
})
</script>

<style scoped>
.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  min-height: 100vh;
  min-height: 100svh;
  margin: 0 auto;
  padding: clamp(72px, 9vh, 112px) 20px clamp(160px, 18vh, 240px);
  display: flex;
  flex-direction: column;
}
.features-section {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: clip;
  background: #121212;
  color: #fff;
  isolation: isolate;
}
.features-scene {
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
  margin-bottom: -100vh;
  height: 100svh;
  margin-bottom: -100svh;
  overflow: hidden;
  pointer-events: none;
}
.features-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
.features-header {
  width: min(620px, 72%);
  text-align: left;
  margin-bottom: clamp(510px, 60vh, 705px);
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.8);
  margin-top: 40px;
}
.features-subtitle {
  font-size: 1.1rem;
  color: #72c2ff;
  margin-bottom: 5px;
  font-weight: 600;
}
.features-header h2 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 5px;
  font-weight: 700;
}
.features-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #c5ced8;
  max-width: 620px;
  white-space: pre-line;
}
.features-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-top: auto;
}
.model-credit {
  position: absolute;
  left: 20px;
  bottom: clamp(28px, 4vh, 56px);
  font-size: 0.85rem;
  line-height: 1.5;
  color: #b7c0ca;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
}
.model-credit__noah {
  color: #3C5B7C;
}
.model-credit__chen {
  color: #4DC0F2;
}
.feature-item {
  padding: 20px 12px;
  text-align: center;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
}
.feature-icon {
  width: 80px; height: 80px;
  background: rgba(79, 167, 255, 0.14);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
}
.feature-icon img {
  width: 40px;
  height: auto;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.feature-item h3 {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 600;
}
.feature-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #b7c0ca;
}

@media (max-width: 768px) {
  .container {
    padding: 64px 20px 160px;
  }
  .model-credit {
    left: 50%;
    bottom: clamp(72px, 10vh, 120px);
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .features-header {
    width: 100%;
    margin-bottom: clamp(480px, 78vh, 630px);
  }
  .features-header h2 {
    font-size: 2.35rem;
    margin-top: 14px;
  }
  .features-list {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .feature-item {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    column-gap: 18px;
    padding: 0;
    text-align: left;
  }
  .feature-icon {
    grid-row: 1 / span 2;
    width: 56px;
    height: 56px;
    margin: 0;
  }
  .feature-icon img {
    width: 28px;
  }
  .feature-item h3 {
    margin-bottom: 5px;
  }
}
</style>
