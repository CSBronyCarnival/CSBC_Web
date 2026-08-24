<template>
  <div
    ref="sceneHostRef"
    class="night-star-background"
    :class="{ 'is-ready': sceneReady }"
    aria-hidden="true"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  logoSrc: { type: String, default: '/img/night/logo.webp' },
  scrollTarget: { type: Object, default: null },
})

const sceneHostRef = ref(null)
const sceneReady = ref(false)
const SCATTER_EASE_IN_SPEED = 3.5
const SCATTER_EASE_OUT_SPEED = 6

const STAR_VERTEX_SHADER = `
  attribute float aSize;
  attribute float aOpacity;
  varying float vOpacity;

  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = aSize * (320.0 / max(-modelViewPosition.z, 0.1));
    vOpacity = aOpacity;
  }
`

const STAR_FRAGMENT_SHADER = `
  varying float vOpacity;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float softness = smoothstep(0.5, 0.08, distanceToCenter);
    gl_FragColor = vec4(vec3(1.0), softness * vOpacity);
  }
`

let renderer = null
let scene = null
let camera = null
let stars = null
let starGeometry = null
let starMaterial = null
let starData = null
let resizeObserver = null
let animationFrame = 0
let logoImage = null
let shapeScale = 3
let targetScrollProgress = 0
let scrollProgress = 0
let clock = null
let disposed = false
let prefersReducedMotion = false
let motionQuery = null

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function resizeScene() {
  const host = sceneHostRef.value
  if (!host || !renderer || !camera) return

  const width = host.clientWidth
  const height = host.clientHeight
  if (!width || !height) return

  const aspect = width / height
  camera.aspect = aspect
  camera.updateProjectionMatrix()
  shapeScale = Math.min(3, 3 * Math.min(aspect, 1))

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height, false)
}

function updateScrollTarget() {
  const target = props.scrollTarget
  if (!target) return

  const rect = target.getBoundingClientRect()
  const travel = Math.max(rect.height, window.innerHeight || 1)
  targetScrollProgress = clamp(-rect.top / travel)
}

function createStarField(image) {
  if (!scene || !image) return false

  const sampleSize = window.innerWidth < 768 ? 108 : 148
  const sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = sampleSize
  sampleCanvas.height = sampleSize
  const context = sampleCanvas.getContext('2d', { willReadFrequently: true })
  if (!context) return false

  context.clearRect(0, 0, sampleSize, sampleSize)
  context.drawImage(image, 0, 0, sampleSize, sampleSize)

  const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data
  const basePositions = []
  const driftX = []
  const driftY = []
  const driftZ = []
  const phases = []
  const sizes = []
  const opacities = []

  for (let y = 0; y < sampleSize; y += 1) {
    for (let x = 0; x < sampleSize; x += 1) {
      const alpha = pixels[(y * sampleSize + x) * 4 + 3] / 255
      if (alpha < 0.35 || Math.random() > 0.78) continue

      const normalizedX = (x + Math.random() - sampleSize / 2) / (sampleSize / 2)
      const normalizedY = (sampleSize / 2 - y - Math.random()) / (sampleSize / 2)
      basePositions.push(normalizedX, normalizedY, (Math.random() - 0.5) * 0.65)
      driftX.push((Math.random() - 0.5) * 3.4)
      driftY.push(0.8 + Math.random() * 4.8)
      driftZ.push((Math.random() - 0.5) * 4.2)
      phases.push(Math.random() * Math.PI * 2)
      sizes.push(0.035 + Math.random() * 0.065)
      opacities.push((0.2 + Math.random() * 0.45) * (0.55 + alpha * 0.25))
    }
  }

  if (!basePositions.length) return false

  starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(new Float32Array(basePositions.length), 3),
  )
  starGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1))
  starGeometry.setAttribute('aOpacity', new THREE.Float32BufferAttribute(opacities, 1))

  starData = {
    basePositions: new Float32Array(basePositions),
    driftX: new Float32Array(driftX),
    driftY: new Float32Array(driftY),
    driftZ: new Float32Array(driftZ),
    phases: new Float32Array(phases),
  }

  starMaterial = new THREE.ShaderMaterial({
    vertexShader: STAR_VERTEX_SHADER,
    fragmentShader: STAR_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  stars = new THREE.Points(starGeometry, starMaterial)
  stars.frustumCulled = false
  scene.add(stars)
  updateStarPositions(0)
  return true
}

function updateStarPositions(time) {
  if (!stars || !starData || !starGeometry) return

  const positions = starGeometry.getAttribute('position').array
  const particleCount = starData.driftX.length
  const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress)
  const scatterProgress = easedProgress * (0.9 + easedProgress * 1.8)
  const upwardOffset = easedProgress * 4.5

  for (let index = 0; index < particleCount; index += 1) {
    const offset = index * 3
    const phase = starData.phases[index]
    const ambientFloat = prefersReducedMotion
      ? 0
      : Math.sin(time * 0.8 + phase) * 0.025 * (1 + easedProgress * 1.5)

    positions[offset] = starData.basePositions[offset] * shapeScale
      + starData.driftX[index] * scatterProgress
      + Math.sin(time * 0.34 + phase) * 0.012 * (1 + easedProgress)
    positions[offset + 1] = starData.basePositions[offset + 1] * shapeScale
      - upwardOffset
      + starData.driftY[index] * scatterProgress
      + ambientFloat
    positions[offset + 2] = starData.basePositions[offset + 2]
      + starData.driftZ[index] * scatterProgress
      + Math.cos(time * 0.42 + phase) * 0.02 * (1 + easedProgress)
  }

  starGeometry.getAttribute('position').needsUpdate = true
  stars.rotation.y = Math.sin(time * 0.12) * 0.035 + easedProgress * 0.12
  stars.rotation.x = Math.cos(time * 0.1) * 0.018 - easedProgress * 0.06
}

function animateScene() {
  if (!renderer || !scene || !camera || !clock) return

  animationFrame = window.requestAnimationFrame(animateScene)
  const delta = Math.min(clock.getDelta(), 0.1)
  const time = clock.elapsedTime

  updateScrollTarget()
  const easingSpeed = targetScrollProgress > scrollProgress
    ? SCATTER_EASE_IN_SPEED
    : SCATTER_EASE_OUT_SPEED
  const follow = prefersReducedMotion ? 1 : 1 - Math.exp(-easingSpeed * delta)
  scrollProgress += (targetScrollProgress - scrollProgress) * follow
  updateStarPositions(time)
  renderer.render(scene, camera)
}

function handleMotionPreference(event) {
  prefersReducedMotion = event.matches
}

function createScene() {
  const host = sceneHostRef.value
  if (!host) return false

  try {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 8)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    resizeScene()
    return true
  } catch {
    renderer?.dispose()
    renderer = null
    return false
  }
}

onMounted(() => {
  disposed = false
  sceneReady.value = false
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionPreference)

  if (!createScene()) return

  clock = new THREE.Clock()
  logoImage = new Image()
  logoImage.decoding = 'async'
  logoImage.onload = () => {
    if (disposed || !createStarField(logoImage)) return

    renderer?.render(scene, camera)
    window.requestAnimationFrame(() => {
      if (!disposed) sceneReady.value = true
    })
  }
  logoImage.src = props.logoSrc

  resizeObserver = new ResizeObserver(resizeScene)
  if (sceneHostRef.value) resizeObserver.observe(sceneHostRef.value)
  window.addEventListener('resize', resizeScene)
  window.addEventListener('scroll', updateScrollTarget, { passive: true })
  updateScrollTarget()
  animationFrame = window.requestAnimationFrame(animateScene)
})

onUnmounted(() => {
  disposed = true
  motionQuery?.removeEventListener('change', handleMotionPreference)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resizeScene)
  window.removeEventListener('scroll', updateScrollTarget)
  if (logoImage) logoImage.onload = null

  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }

  starGeometry?.dispose()
  starMaterial?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss()
  renderer?.domElement.remove()
  renderer = null
  scene = null
  camera = null
  stars = null
  starGeometry = null
  starMaterial = null
  starData = null
  clock = null
})
</script>

<style scoped>
.night-star-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
  will-change: opacity;
}

.night-star-background.is-ready {
  opacity: 1;
}

.night-star-background :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .night-star-background {
    transition-duration: 0.01ms;
  }
}
</style>
