<template>
  <main ref="sceneHostRef" class="error-page" :aria-label="`Error ${errorCode}`" />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import * as CANNON from 'cannon-es'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

const sceneHostRef = ref(null)
const errorCode = computed(() => String(props.error?.statusCode ?? 500))

const FONT_URL = 'https://www.oppo.com/content/dam/statics/fonts/cn/OPPOSans3.0cn-Bold.woff2'
const FONT_FAMILY = 'CSBCOPPOSansError'
const WORLD_WIDTH = 13
const WORLD_HEIGHT = 8
const DIGIT_HEIGHT = 3.8
const DIGIT_DEPTH = 0.58
const DIGIT_SPACING = 0.38
const GROUND_Y = -DIGIT_HEIGHT / 2
const DRAG_MAX_SPEED = 11
const DRAG_MAX_FORCE = 850
const RASTER_FONT_SIZE = 256
const RASTER_STEP = 2
const CUBE_COUNT = 5
const CUBE_TEXTURE_URLS = [
  '/img/fun/1.webp',
  '/img/fun/2.webp'
]

let renderer = null
let scene = null
let camera = null
let keyLight = null
let digitRoot = null
let world = null
let groundBody = null
let resizeObserver = null
let animationFrame = 0
let cubeDropTimer = 0
let clock = null
let raycaster = null
let pointer = null
let dragPoint = null
let dragPlane = null
let dragAnchorBody = null
let dragConstraint = null
let draggedObject = null
let dragLocalPivot = null
let dragTarget = null
let dragAnchorDelta = null
let dragVelocity = null
let lastDragPoint = null
let lastDragTime = 0
let digits = []
let cubes = []
let interactiveMeshes = []
let glyphGeometries = []
let digitMaterial = null
let digitPhysicsMaterial = null
let cubeGeometry = null
let cubeTextures = []
let cubeMaterials = []
let roomMaterial = null
let floorGeometry = null
let floorMesh = null
let disposed = false

async function loadFont() {
  if (typeof FontFace === 'undefined' || !document.fonts) return false
  try {
    const font = new FontFace(FONT_FAMILY, `url(${FONT_URL}) format('woff2')`, {
      weight: '700',
      style: 'normal'
    })
    const loadedFont = await font.load()
    document.fonts.add(loadedFont)
    await document.fonts.load(`700 ${RASTER_FONT_SIZE}px "${FONT_FAMILY}"`, errorCode.value)
    return true
  } catch {
    return false
  }
}

async function loadCubeTextures() {
  const loader = new THREE.TextureLoader()
  try {
    cubeTextures = await Promise.all(
      CUBE_TEXTURE_URLS.map((url) => loader.loadAsync(url))
    )
    cubeTextures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
    })
    return true
  } catch {
    cubeTextures.forEach((texture) => texture.dispose())
    cubeTextures = []
    return false
  }
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[items[index], items[target]] = [items[target], items[index]]
  }
  return items
}

function readGlyphPixels(character) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  context.font = `700 ${RASTER_FONT_SIZE}px "${FONT_FAMILY}", Arial, sans-serif`
  const metrics = context.measureText(character)
  const ascent = metrics.actualBoundingBoxAscent || RASTER_FONT_SIZE * 0.76
  const descent = metrics.actualBoundingBoxDescent || RASTER_FONT_SIZE * 0.08
  const measuredWidth = Math.max(metrics.width, RASTER_FONT_SIZE * 0.5)
  const padding = 10
  canvas.width = Math.ceil(measuredWidth + padding * 2)
  canvas.height = Math.ceil(ascent + descent + padding * 2)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = `700 ${RASTER_FONT_SIZE}px "${FONT_FAMILY}", Arial, sans-serif`
  context.fillStyle = '#ffffff'
  context.textBaseline = 'alphabetic'
  context.fillText(character, padding, padding + ascent)

  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  const activeCells = []
  let minX = canvas.width
  let minY = canvas.height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < canvas.height; y += RASTER_STEP) {
    for (let x = 0; x < canvas.width; x += RASTER_STEP) {
      let active = false
      for (let sampleY = y; sampleY < Math.min(y + RASTER_STEP, canvas.height) && !active; sampleY += 1) {
        for (let sampleX = x; sampleX < Math.min(x + RASTER_STEP, canvas.width); sampleX += 1) {
          if (image.data[(sampleY * canvas.width + sampleX) * 4 + 3] > 96) {
            active = true
            break
          }
        }
      }
      if (!active) continue
      const cellX = Math.floor(x / RASTER_STEP)
      const cellY = Math.floor(y / RASTER_STEP)
      activeCells.push([cellX, cellY])
      minX = Math.min(minX, cellX)
      minY = Math.min(minY, cellY)
      maxX = Math.max(maxX, cellX)
      maxY = Math.max(maxY, cellY)
    }
  }

  if (!activeCells.length) return null
  const cellWidth = maxX - minX + 1
  const cellHeight = maxY - minY + 1
  const scale = DIGIT_HEIGHT / (cellHeight * RASTER_STEP)
  const centerX = (minX + maxX + 1) / 2
  const centerY = (minY + maxY + 1) / 2
  const cellsByRow = new Map()

  for (const [cellX, cellY] of activeCells) {
    if (!cellsByRow.has(cellY)) cellsByRow.set(cellY, [])
    cellsByRow.get(cellY).push(cellX)
  }

  const runs = []
  for (const [cellY, rowCells] of cellsByRow) {
    rowCells.sort((a, b) => a - b)
    let runStart = rowCells[0]
    let runEnd = rowCells[0]
    for (let index = 1; index <= rowCells.length; index += 1) {
      const cell = rowCells[index]
      if (cell !== runEnd + 1) {
        runs.push({
          width: (runEnd - runStart + 1) * RASTER_STEP * scale * 1.04,
          height: RASTER_STEP * scale * 1.08,
          x: ((runStart + runEnd + 1) / 2 - centerX) * RASTER_STEP * scale,
          y: (centerY - cellY - 0.5) * RASTER_STEP * scale
        })
        runStart = cell
      }
      runEnd = cell
    }
  }

  return {
    width: cellWidth * RASTER_STEP * scale,
    height: cellHeight * RASTER_STEP * scale,
    runs
  }
}

function createDigitVisual(glyph, character, group) {
  const parts = []
  for (const run of glyph.runs) {
    const geometry = new THREE.BoxGeometry(run.width, run.height, DIGIT_DEPTH)
    geometry.translate(run.x, run.y, 0)
    parts.push(geometry)
  }

  const geometry = mergeGeometries(parts, false)
  parts.forEach((part) => part.dispose())
  if (!geometry) return
  glyphGeometries.push(geometry)
  const mesh = new THREE.Mesh(geometry, digitMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.userData.digitGroup = group
  mesh.userData.character = character
  group.add(mesh)
  interactiveMeshes.push(mesh)
}

function createPhysicsBody(glyph, position, rotation) {
  const body = new CANNON.Body({
    mass: 1,
    material: digitPhysicsMaterial,
    linearDamping: 0.08,
    angularDamping: 0.14,
    position: new CANNON.Vec3(position.x, position.y, position.z)
  })
  body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z)
  body.addShape(new CANNON.Box(new CANNON.Vec3(glyph.width / 2, glyph.height / 2, DIGIT_DEPTH / 2)))
  world.addBody(body)
  return body
}

function createDigits() {
  const code = errorCode.value
  const glyphs = code.split('').map((character) => readGlyphPixels(character) || {
    width: DIGIT_HEIGHT * 0.62,
    height: DIGIT_HEIGHT,
    runs: [{ width: DIGIT_HEIGHT * 0.62, height: DIGIT_HEIGHT, x: 0, y: 0 }]
  })
  const totalWidth = glyphs.reduce((sum, glyph) => sum + glyph.width, 0) + DIGIT_SPACING * Math.max(0, code.length - 1)
  let cursor = -totalWidth / 2

  digits = code.split('').map((character, index) => {
    const glyph = glyphs[index]
    const homeX = cursor + glyph.width / 2
    cursor += glyph.width + DIGIT_SPACING
    const group = new THREE.Group()
    const initialRotation = new THREE.Euler(
      (Math.random() - 0.5) * 0.42,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.3
    )
    group.position.set(homeX + (Math.random() - 0.5) * 0.22, 5.7 + index * 0.75, (index - 1) * 0.12)
    group.rotation.copy(initialRotation)
    group.userData.digitIndex = index
    group.userData.width = glyph.width
    digitRoot.add(group)
    createDigitVisual(glyph, character, group)
    const body = createPhysicsBody(glyph, group.position, initialRotation)
    const digit = { group, body, glyph, homeX, dragging: false }
    body.userData = { group, index, physicsObject: digit }
    group.userData.physicsObject = digit
    return digit
  })
}

function createCubeBody(position, rotation) {
  const body = new CANNON.Body({
    mass: 0.72,
    material: digitPhysicsMaterial,
    linearDamping: 0.06,
    angularDamping: 0.1,
    position: new CANNON.Vec3(position.x, position.y, position.z)
  })
  body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z)
  body.addShape(new CANNON.Box(new CANNON.Vec3(0.48, 0.48, 0.48)))
  world.addBody(body)
  return body
}

function createCubes() {
  const requiredTextureIndexes = CUBE_TEXTURE_URLS.map((_, index) => index)
  const randomTextureIndexes = Array.from(
    { length: Math.max(0, CUBE_COUNT - requiredTextureIndexes.length) },
    () => Math.floor(Math.random() * CUBE_TEXTURE_URLS.length)
  )
  const textureIndexes = shuffle([...requiredTextureIndexes, ...randomTextureIndexes])
  const spawnLanes = shuffle([-4.2, -2.7, 0, 2.7, 4.2])

  cubes = textureIndexes.map((textureIndex, index) => {
    const group = new THREE.Group()
    const rotation = new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    )
    group.position.set(
      spawnLanes[index] + (Math.random() - 0.5) * 0.65,
      5.8 + Math.random() * 3,
      (Math.random() - 0.5) * 1.5
    )
    group.rotation.copy(rotation)
    group.userData.cubeIndex = index
    group.userData.textureIndex = textureIndex

    const material = new THREE.MeshStandardMaterial({
      map: cubeTextures[textureIndex],
      color: 0xffffff,
      roughness: 0.56,
      metalness: 0.08
    })
    cubeMaterials.push(material)
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.castShadow = true
    cube.receiveShadow = true
    cube.userData.cubeGroup = group
    group.add(cube)
    digitRoot.add(group)
    interactiveMeshes.push(cube)

    const body = createCubeBody(group.position, rotation)
    const cubeObject = { group, body, cube, material, groundClearance: 0.52 }
    body.userData = { group, index, physicsObject: cubeObject }
    group.userData.physicsObject = cubeObject
    return cubeObject
  })
}

function createInfiniteGround() {
  const body = new CANNON.Body({ mass: 0, type: CANNON.BODY_TYPES.STATIC })
  body.addShape(new CANNON.Plane())
  body.position.y = -DIGIT_HEIGHT / 2
  body.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(body)
  return body
}

function createPhysicsWorld() {
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -12, 0) })
  world.broadphase = new CANNON.SAPBroadphase(world)
  world.solver.iterations = 20
  world.solver.tolerance = 0.001
  world.allowSleep = true
  digitPhysicsMaterial = new CANNON.Material('digit')
  groundBody = createInfiniteGround()
  const groundMaterial = new CANNON.Material('ground')
  groundBody.material = groundMaterial
  world.addContactMaterial(new CANNON.ContactMaterial(digitPhysicsMaterial, groundMaterial, {
    friction: 0.68,
    restitution: 0.42
  }))
  world.addContactMaterial(new CANNON.ContactMaterial(digitPhysicsMaterial, digitPhysicsMaterial, {
    friction: 0.48,
    restitution: 0.5
  }))
}

function syncDigitsFromPhysics() {
  for (const digit of digits) {
    const { body, group } = digit
    group.position.set(body.position.x, body.position.y, body.position.z)
    group.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
  }
  for (const cube of cubes) {
    const { body, group } = cube
    group.position.set(body.position.x, body.position.y, body.position.z)
    group.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
  }
}

function getMinimumDragTargetY(object) {
  if (!object || !dragLocalPivot) return GROUND_Y
  object.body.updateAABB()
  const lowerOffset = object.body.aabb.lowerBound.y - object.body.position.y
  const pivotOffset = object.body.quaternion.vmult(dragLocalPivot, new CANNON.Vec3())
  return GROUND_Y + pivotOffset.y - lowerOffset + 0.02
}

function updateDragAnchor(delta) {
  if (!dragAnchorBody || !dragTarget || !dragAnchorDelta) return
  dragTarget.vsub(dragAnchorBody.position, dragAnchorDelta)
  const distance = dragAnchorDelta.length()
  if (!distance) {
    dragAnchorBody.velocity.setZero()
    return
  }
  const travel = Math.min(distance, DRAG_MAX_SPEED * delta)
  dragAnchorDelta.scale(travel / distance, dragAnchorDelta)
  dragAnchorBody.position.vadd(dragAnchorDelta, dragAnchorBody.position)
  dragAnchorBody.velocity.setZero()
}

function enforceDraggedGroundClearance() {
  if (!draggedObject) return
  const body = draggedObject.body
  body.updateAABB()
  const penetration = GROUND_Y - body.aabb.lowerBound.y
  if (penetration <= 0) return
  body.position.y += penetration + 0.002
  if (body.velocity.y < 0) body.velocity.y = 0
  body.aabbNeedsUpdate = true
  body.wakeUp()
}

function resizeScene() {
  const host = sceneHostRef.value
  if (!host || !renderer || !camera) return
  const width = host.clientWidth
  const height = host.clientHeight
  if (!width || !height) return
  const aspect = width / height
  const worldAspect = WORLD_WIDTH / WORLD_HEIGHT
  let halfWidth
  let halfHeight
  if (aspect > worldAspect) {
    halfHeight = WORLD_HEIGHT / 2
    halfWidth = halfHeight * aspect
    floorMesh?.scale.set(1, 1, 1)
    floorMesh?.position.set(0, -DIGIT_HEIGHT / 2, 2.5)
    renderer.domElement.style.background = '#ffffff'
  } else {
    halfWidth = WORLD_WIDTH / 2
    halfHeight = halfWidth / aspect
    floorMesh?.scale.set(0.1, 0.1, 1)
    floorMesh?.position.set(0, -DIGIT_HEIGHT / 2, 0)
    const split = ((1 + 3.4488 / halfHeight) / 2) * 100
    renderer.domElement.style.background = `linear-gradient(to bottom, #ffffff 0%, #ffffff ${split}%, #ececec ${split}%, #ececec 100%)`
  }
  camera.left = -halfWidth
  camera.right = halfWidth
  camera.top = halfHeight
  camera.bottom = -halfHeight
  camera.updateProjectionMatrix()
  if (keyLight) {
    const shadowExtent = Math.max(28, halfWidth * 3.2)
    keyLight.shadow.camera.left = -shadowExtent
    keyLight.shadow.camera.right = shadowExtent
    keyLight.shadow.camera.top = shadowExtent
    keyLight.shadow.camera.bottom = -shadowExtent
    keyLight.shadow.camera.near = 0.1
    keyLight.shadow.camera.far = 100
    keyLight.shadow.camera.updateProjectionMatrix()
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height, false)
}

function updatePointer(event) {
  const canvas = renderer?.domElement
  if (!canvas || !pointer) return false
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height) return false
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  return true
}

function getPointerWorldPoint(event) {
  if (!camera || !raycaster || !dragPlane || !dragPoint || !updatePointer(event)) return null
  raycaster.setFromCamera(pointer, camera)
  return raycaster.ray.intersectPlane(dragPlane, dragPoint)
}

function findPhysicsObjectFromIntersection(object) {
  let current = object
  while (current && current !== digitRoot) {
    const group = current.userData?.digitGroup || current.userData?.cubeGroup
    if (group?.userData?.physicsObject) {
      return group.userData.physicsObject
    }
    current = current.parent
  }
  return null
}

function onPointerDown(event) {
  if (!renderer || !camera || !updatePointer(event)) return
  raycaster.setFromCamera(pointer, camera)
  const intersections = raycaster.intersectObjects(interactiveMeshes, false)
  const selection = intersections
    .map((hit) => ({
      physicsObject: findPhysicsObjectFromIntersection(hit.object),
      point: hit.point
    }))
    .find(({ physicsObject }) => Boolean(physicsObject))
  const physicsObject = selection?.physicsObject
  if (!physicsObject || !selection?.point || dragAnchorBody) return
  dragPlane.constant = -selection.point.z
  const worldPoint = selection.point.clone()

  draggedObject = physicsObject
  physicsObject.dragging = true
  dragLocalPivot = physicsObject.body.pointToLocalFrame(
    new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z),
    new CANNON.Vec3()
  )
  dragTarget = new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z)
  dragTarget.y = Math.max(dragTarget.y, getMinimumDragTargetY(physicsObject))
  dragAnchorDelta = new CANNON.Vec3()
  dragAnchorBody = new CANNON.Body({ mass: 0, type: CANNON.BODY_TYPES.STATIC })
  dragAnchorBody.position.copy(dragTarget)
  world.addBody(dragAnchorBody)
  dragConstraint = new CANNON.PointToPointConstraint(
    physicsObject.body,
    dragLocalPivot,
    dragAnchorBody,
    new CANNON.Vec3(0, 0, 0),
    DRAG_MAX_FORCE
  )
  world.addConstraint(dragConstraint)
  dragVelocity = new CANNON.Vec3()
  lastDragPoint = worldPoint.clone()
  lastDragTime = performance.now()
  physicsObject.body.wakeUp()
  renderer.domElement.style.cursor = 'grabbing'
  renderer.domElement.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  const worldPoint = getPointerWorldPoint(event)
  if (!worldPoint) return
  if (!draggedObject || !dragAnchorBody || !lastDragPoint || !dragTarget) {
    raycaster.setFromCamera(pointer, camera)
    renderer.domElement.style.cursor = raycaster.intersectObjects(interactiveMeshes, false).length
      ? 'grab'
      : 'default'
    return
  }

  const now = performance.now()
  const delta = Math.max((now - lastDragTime) / 1000, 1 / 120)
  dragVelocity.set(
    (worldPoint.x - lastDragPoint.x) / delta,
    (worldPoint.y - lastDragPoint.y) / delta,
    (worldPoint.z - lastDragPoint.z) / delta
  )
  if (dragVelocity.length() > DRAG_MAX_SPEED) dragVelocity.scale(DRAG_MAX_SPEED / dragVelocity.length(), dragVelocity)
  dragTarget.set(
    worldPoint.x,
    Math.max(worldPoint.y, getMinimumDragTargetY(draggedObject)),
    worldPoint.z
  )
  lastDragPoint.copy(worldPoint)
  lastDragTime = now
}

function onPointerUp(event) {
  if (!draggedObject) return
  if (dragConstraint) world.removeConstraint(dragConstraint)
  if (dragAnchorBody) world.removeBody(dragAnchorBody)
  draggedObject.body.velocity.set(dragVelocity?.x || 0, dragVelocity?.y || 0, dragVelocity?.z || 0)
  draggedObject.body.wakeUp()
  draggedObject.dragging = false
  draggedObject = null
  dragAnchorBody = null
  dragConstraint = null
  dragLocalPivot = null
  dragTarget = null
  dragAnchorDelta = null
  dragVelocity = null
  lastDragPoint = null
  if (renderer?.domElement.hasPointerCapture?.(event.pointerId)) {
    renderer.domElement.releasePointerCapture(event.pointerId)
  }
  if (dragPlane) dragPlane.constant = 0
  if (renderer) renderer.domElement.style.cursor = 'grab'
}

function animateScene() {
  if (disposed || !renderer || !scene || !camera || !clock || !world) return
  animationFrame = window.requestAnimationFrame(animateScene)
  const delta = Math.min(clock.getDelta(), 0.05)
  updateDragAnchor(delta)
  world.step(1 / 60, delta, 5)
  enforceDraggedGroundClearance()
  syncDigitsFromPhysics()
  renderer.render(scene, camera)
}

function createScene() {
  const host = sceneHostRef.value
  if (!host) return false
  try {
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-WORLD_WIDTH / 2, WORLD_WIDTH / 2, WORLD_HEIGHT / 2, -WORLD_HEIGHT / 2, 0.1, 100)
    camera.position.set(0, 2.4, 14)
    camera.lookAt(0, -0.35, 0)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0xffffff, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.cursor = 'grab'
    host.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e1e8, 1.45))
    keyLight = new THREE.DirectionalLight(0xffffff, 4.2)
    keyLight.position.set(-4.5, 8, 7)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(4096, 4096)
    keyLight.shadow.bias = -0.0004
    keyLight.shadow.normalBias = 0.035
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0xb8dcff, 7, 18)
    rimLight.position.set(4, 2, 6)
    scene.add(rimLight)

    roomMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.96,
      metalness: 0
    })
    floorGeometry = new THREE.PlaneGeometry(200, 200)
    const floor = new THREE.Mesh(floorGeometry, roomMaterial)
    floor.position.set(0, -DIGIT_HEIGHT / 2, 2.5)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)
    floorMesh = floor

    digitRoot = new THREE.Group()
    scene.add(digitRoot)
    digitMaterial = new THREE.MeshStandardMaterial({ color: 0x68bdf2, emissive: 0x0b263b, emissiveIntensity: 0.22, metalness: 0.3, roughness: 0.3 })
    cubeGeometry = new THREE.BoxGeometry(0.96, 0.96, 0.96)
    raycaster = new THREE.Raycaster()
    pointer = new THREE.Vector2()
    dragPoint = new THREE.Vector3()
    dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    createPhysicsWorld()
    createDigits()
    resizeScene()
    return true
  } catch {
    renderer?.dispose()
    renderer = null
    return false
  }
}

onMounted(async () => {
  disposed = false
  await Promise.all([loadFont(), loadCubeTextures()])
  if (!createScene()) return
  const canvas = renderer.domElement
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resizeScene) : null
  resizeObserver?.observe(sceneHostRef.value)
  window.addEventListener('resize', resizeScene)
  clock = new THREE.Clock()
  animationFrame = window.requestAnimationFrame(animateScene)
  cubeDropTimer = window.setTimeout(() => {
    if (!disposed && world && digitRoot && cubeTextures.length) createCubes()
  }, 1000)
})

onUnmounted(() => {
  disposed = true
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  if (cubeDropTimer) window.clearTimeout(cubeDropTimer)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resizeScene)
  const canvas = renderer?.domElement
  canvas?.removeEventListener('pointerdown', onPointerDown)
  canvas?.removeEventListener('pointermove', onPointerMove)
  canvas?.removeEventListener('pointerup', onPointerUp)
  canvas?.removeEventListener('pointercancel', onPointerUp)
  if (dragConstraint && world) world.removeConstraint(dragConstraint)
  if (dragAnchorBody && world) world.removeBody(dragAnchorBody)
  for (const geometry of glyphGeometries) geometry.dispose()
  cubeGeometry?.dispose()
  cubeMaterials.forEach((material) => material.dispose())
  cubeTextures.forEach((texture) => texture.dispose())
  floorGeometry?.dispose()
  digitMaterial?.dispose()
  roomMaterial?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss?.()
  canvas?.remove()
  renderer = null
  scene = null
  camera = null
  keyLight = null
  digitRoot = null
  world = null
  dragAnchorBody = null
  dragConstraint = null
  draggedObject = null
  digits = []
  cubes = []
  interactiveMeshes = []
  glyphGeometries = []
  cubeGeometry = null
  cubeMaterials = []
  cubeTextures = []
  floorGeometry = null
  roomMaterial = null
  floorMesh = null
  clock = null
  cubeDropTimer = 0
})
</script>

<style scoped>
.error-page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
  background: #fff;
}

.error-page :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
