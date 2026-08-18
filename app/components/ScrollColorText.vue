<template>
  <component
    :is="as"
    ref="textRef"
    class="scroll-color-text"
    :style="styleVars"
  >
    <span ref="baseRef" class="scroll-color-text__base"><slot /></span>
    <span
      class="scroll-color-text__cover"
      :style="{ clipPath }"
      aria-hidden="true"
    ><slot /></span>
  </component>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  as: { type: [String, Object], default: 'span' },
  color1: { type: String, default: '#ffffff' },
  color2: { type: String, default: '#72c2ff' },
})

const textRef = ref(null)
const baseRef = ref(null)
const progress = ref(0)
const clipPath = ref('inset(0 100% 0 0)')
let frameId = 0
let resizeObserver = null
let mutationObserver = null
let lineRects = []

const styleVars = computed(() => ({
  '--scroll-color-1': props.color1,
  '--scroll-color-2': props.color2,
  '--scroll-color-progress': `${progress.value * 100}%`,
}))

function updateClipPath(value) {
  if (!lineRects.length) {
    clipPath.value = `inset(0 calc(100% - ${value * 100}%) 0 0)`
    return
  }

  const lineCount = lineRects.length
  const points = ['0px 0px']
  let previousRight = 0

  lineRects.forEach((line, index) => {
    const lineProgress = Math.min(Math.max(value * lineCount - index, 0), 1)
    const right = line.left + line.width * lineProgress
    points.push(`${previousRight}px ${line.top}px`)
    points.push(`${right}px ${line.top}px`)
    points.push(`${right}px ${line.bottom}px`)
    previousRight = right
  })

  points.push(`${previousRight}px 100%`)
  points.push('0px 100%')
  clipPath.value = `polygon(${points.join(', ')})`
}

function measureLines() {
  const element = textRef.value
  const base = baseRef.value
  if (!element || !base) return

  const elementRect = element.getBoundingClientRect()
  const range = document.createRange()
  range.selectNodeContents(base)

  const rects = Array.from(range.getClientRects())
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .sort((a, b) => a.top - b.top || a.left - b.left)

  const nextLines = []
  rects.forEach((rect) => {
    const line = nextLines[nextLines.length - 1]
    if (!line || Math.abs(line.top - rect.top) > 2) {
      nextLines.push({
        left: Math.max(rect.left - elementRect.left, 0),
        right: Math.min(rect.right - elementRect.left, elementRect.width),
        top: Math.max(rect.top - elementRect.top, 0),
        bottom: Math.min(rect.bottom - elementRect.top, elementRect.height),
      })
      return
    }

    line.left = Math.min(line.left, Math.max(rect.left - elementRect.left, 0))
    line.right = Math.max(line.right, Math.min(rect.right - elementRect.left, elementRect.width))
    line.top = Math.min(line.top, Math.max(rect.top - elementRect.top, 0))
    line.bottom = Math.max(line.bottom, Math.min(rect.bottom - elementRect.top, elementRect.height))
  })

  lineRects = nextLines.map((line) => ({
    left: line.left,
    top: line.top,
    bottom: line.bottom,
    width: Math.max(line.right - line.left, 0),
  }))
  updateClipPath(progress.value)
  range.detach?.()
}

function updateProgress() {
  const element = textRef.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const startY = viewportHeight * 0.75
  const endY = viewportHeight * 0.4
  const travel = Math.max(startY - endY, 1)

  progress.value = Math.min(Math.max((startY - rect.top) / travel, 0), 1)
  updateClipPath(progress.value)
}

function queueProgressUpdate() {
  if (frameId) return

  frameId = window.requestAnimationFrame(() => {
    frameId = 0
    updateProgress()
  })
}

onMounted(() => {
  nextTick(() => {
    measureLines()
    updateProgress()
  })
  window.addEventListener('scroll', queueProgressUpdate, { passive: true })
  window.addEventListener('resize', queueProgressUpdate)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      measureLines()
      queueProgressUpdate()
    })
    if (textRef.value) resizeObserver.observe(textRef.value)
  }

  if (typeof MutationObserver !== 'undefined' && baseRef.value) {
    mutationObserver = new MutationObserver(() => {
      measureLines()
      queueProgressUpdate()
    })
    mutationObserver.observe(baseRef.value, {
      characterData: true,
      childList: true,
      subtree: true,
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', queueProgressUpdate)
  window.removeEventListener('resize', queueProgressUpdate)
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()

  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = 0
  }
})
</script>

<style scoped>
.scroll-color-text {
  position: relative;
  color: var(--scroll-color-1);
}

.scroll-color-text__base,
.scroll-color-text__cover {
  display: block;
}

.scroll-color-text__base {
  color: var(--scroll-color-1);
}

.scroll-color-text__cover {
  position: absolute;
  inset: 0;
  color: var(--scroll-color-2);
  clip-path: inset(0 calc(100% - var(--scroll-color-progress)) 0 0);
  pointer-events: none;
  user-select: none;
}

</style>
