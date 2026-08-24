<template>
  <section
    ref="sectionRef"
    class="history-section"
    :aria-label="$t('history.ariaLabel')"
  >
    <div class="history-sticky">
      <div
        ref="trackRef"
        class="history-track"
        :style="{ transform: `translate3d(${trackOffset}px, 0, 0)` }"
      >
        <article v-for="node in historyNodes" :key="node.id" class="history-node">
          <div class="history-year-row">
            <span class="history-year">{{ node.year }}</span>
            <span v-if="node.period" class="history-period">
              {{ $t('history.period.' + node.period) }}
            </span>
          </div>

          <div class="history-card">
            <div
              :ref="(element) => setPhotoRef(node.id, element)"
              class="history-photo"
              :style="{ '--history-photo-parallax': `${imageParallax[node.id] ?? 0}px` }"
            >
              <ImgLazy
                :src="node.image"
                :alt="`${node.year} ${$t('history.photoAlt')}`"
              />
            </div>
            <div class="history-attendance">
              <span>{{ $t('history.attendees') }}</span>
              <strong>{{ node.attendees ?? $t('history.pending') }}</strong>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref(null)
const trackRef = ref(null)
const trackOffset = ref(0)
const imageParallax = ref({})

const historyNodes = [
  { id: '2022', year: '2022', image: '/img/gallery/group_photo/2022.webp', attendees: '100+' },
  { id: '2023', year: '2023', image: '/img/gallery/group_photo/2023.webp', attendees: '260+' },
  {
    id: '2024-winter',
    year: '2024',
    image: '/img/gallery/group_photo/2024-d.webp',
    period: 'winter',
    attendees: '120+',
  },
  {
    id: '2024-summer',
    year: '2024',
    image: '/img/gallery/group_photo/2024.webp',
    period: 'summer',
    attendees: '350+',
  },
  { id: '2025', year: '2025', image: '/img/gallery/group_photo/2025.webp', attendees: '460+' },
  { id: '2026', year: '2026', image: '/img/gallery/group_photo/2026.webp', attendees: '670+' },
]

let scrollFrame = 0
let resizeObserver = null
let horizontalDistance = 0
const photoRefs = new Map()
const photoMetrics = new Map()

function setPhotoRef(id, element) {
  if (element) {
    photoRefs.set(id, element)
    return
  }

  photoRefs.delete(id)
  photoMetrics.delete(id)
}

function updatePhotoMetrics() {
  photoMetrics.clear()

  historyNodes.forEach((node) => {
    const photo = photoRefs.get(node.id)
    if (!photo) return

    const rect = photo.getBoundingClientRect()
    photoMetrics.set(node.id, {
      center: rect.left + rect.width / 2 - trackOffset.value,
      width: rect.width,
    })
  })
}

function updateImageParallax(offset) {
  const viewportCenter = window.innerWidth / 2
  const offsets = {}

  historyNodes.forEach((node) => {
    const metric = photoMetrics.get(node.id)
    if (!metric) return

    const centeredTrackOffset = viewportCenter - metric.center
    const maxOffset = metric.width * 0.11
    const rawOffset = -(offset - centeredTrackOffset) * 0.05
    offsets[node.id] = Math.min(Math.max(rawOffset, -maxOffset), maxOffset)
  })

  imageParallax.value = offsets
}

function updateDimensions() {
  const section = sectionRef.value
  const track = trackRef.value
  if (!section || !track) return

  const viewportWidth = section.clientWidth || window.innerWidth
  horizontalDistance = Math.max(track.scrollWidth - viewportWidth, 0)
  section.style.height = `${horizontalDistance + window.innerHeight}px`
  updatePhotoMetrics()
  updateScrollPosition()
}

function updateScrollPosition() {
  if (scrollFrame) return

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0
    const section = sectionRef.value
    if (!section) return

    const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1)
    const sectionProgress = Math.min(Math.max(-section.getBoundingClientRect().top / scrollRange, 0), 1)
    const nextTrackOffset = -horizontalDistance * sectionProgress
    trackOffset.value = nextTrackOffset
    updateImageParallax(nextTrackOffset)
  })
}

onMounted(async () => {
  await nextTick()
  updateDimensions()
  window.addEventListener('scroll', updateScrollPosition, { passive: true })
  window.addEventListener('resize', updateDimensions)

  resizeObserver = new ResizeObserver(updateDimensions)
  if (trackRef.value) resizeObserver.observe(trackRef.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollPosition)
  window.removeEventListener('resize', updateDimensions)
  resizeObserver?.disconnect()
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>

<style scoped>
.history-section {
  position: relative;
  min-height: 100vh;
  background: #fff;
  color: #2c3e50;
  isolation: isolate;
}

.history-sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #fff;
}

.history-track {
  display: flex;
  align-items: center;
  gap: clamp(28px, 5vw, 80px);
  width: max-content;
  padding: 0 max(20px, calc((100vw - 1200px) / 2));
  will-change: transform;
}

.history-node {
  flex: 0 0 clamp(300px, 43vw, 560px);
}

.history-year-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  min-height: 84px;
  margin-bottom: 18px;
}

.history-year {
  font-size: clamp(3.2rem, 6vw, 6rem);
  line-height: 0.95;
  font-weight: 700;
  letter-spacing: 0;
  color: #2c3e50;
}

.history-period {
  color: #4a90d9;
  font-size: 1rem;
  font-weight: 600;
}

.history-photo {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 10px;
  background: #f0f2f5;
}

.history-photo :deep(.lazy-img) {
  width: 100%;
  height: 100%;
  transform: translate3d(var(--history-photo-parallax, 0), 0, 0) scale(1.25);
  transform-origin: center center;
  will-change: transform;
}

.history-attendance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 22px 20px;
  color: #555;
  font-size: 1rem;
}

.history-attendance strong {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .history-track {
    gap: 24px;
    padding: 0 20px;
  }

  .history-node {
    flex-basis: min(82vw, 420px);
  }

  .history-year-row {
    min-height: 64px;
    margin-bottom: 14px;
  }

  .history-year {
    font-size: 3.5rem;
  }

  .history-attendance {
    padding: 15px 17px 17px;
  }
}
</style>
