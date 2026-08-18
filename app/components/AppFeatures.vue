<template>
  <section ref="sectionRef" class="features-section">
    <div ref="sceneHostRef" class="features-scene" aria-hidden="true"></div>
    <div class="container">
      <div class="features-header">
        <div class="features-subtitle">{{ $t('features.subtitle') }}</div>
        <h2>{{ $t('features.title') }}</h2>
        <p class="features-description" v-html="$t('features.desc')"></p>
      </div>
      <div class="features-list">
        <div v-for="(item, idx) in featureItems" :key="idx" class="feature-item">
          <div class="feature-icon"><img :src="item.icon"></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'

const { t } = useI18n()
const sectionRef = ref(null)
const sceneHostRef = ref(null)

let renderer = null
let composer = null
let camera = null
let cube = null
let cameraRadius = 6.8
let resizeObserver = null
let scrollFrame = 0
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

function renderFromScroll() {
  scrollFrame = 0
  const section = sectionRef.value
  if (!section || !cube || !composer) return

  const rect = section.getBoundingClientRect()
  const travel = rect.height + window.innerHeight
  const progress = Math.min(Math.max((window.innerHeight - rect.top) / travel, 0), 1)
  const orbitAngle = -0.45 + progress * Math.PI

  camera.position.set(
    Math.sin(orbitAngle) * cameraRadius,
    2.4,
    Math.cos(orbitAngle) * cameraRadius,
  )
  camera.lookAt(cube.position)
  composer.render()
}

function requestSceneRender() {
  if (scrollFrame) return
  scrollFrame = window.requestAnimationFrame(renderFromScroll)
}

function createScene() {
  const host = sceneHostRef.value
  if (!host) return

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020204)

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

  const geometry = new THREE.BoxGeometry(1.25, 1.25, 1.25)
  const material = new THREE.MeshStandardMaterial({
    color: 0x4d8fc2,
    metalness: 0.28,
    roughness: 0.32,
  })
  const edgeGeometry = new THREE.EdgesGeometry(geometry)
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x9fcff0,
    transparent: true,
    opacity: 0.55,
  })
  disposableResources.push(geometry, material, edgeGeometry, edgeMaterial)

  cube = new THREE.Group()
  cube.add(new THREE.Mesh(geometry, material))
  cube.add(new THREE.LineSegments(edgeGeometry, edgeMaterial))
  scene.add(cube)

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
    requestSceneRender()
  })
  resizeObserver.observe(host)

  resizeScene()
  renderFromScroll()
}

onMounted(() => {
  createScene()
  window.addEventListener('scroll', requestSceneRender, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestSceneRender)
  resizeObserver?.disconnect()
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)

  disposableResources.forEach((resource) => resource.dispose())
  disposableResources.length = 0
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
  background: #020204;
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
  margin-bottom: clamp(260px, 34vh, 390px);
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
.feature-item {
  padding: 20px 12px;
  text-align: center;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
}
.feature-icon {
  width: 80px; height: 80px;
  background: rgba(79, 167, 255, 0.14);
  border: 1px solid rgba(126, 198, 255, 0.32);
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
  .features-header {
    width: 100%;
    margin-bottom: clamp(260px, 45vh, 360px);
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
