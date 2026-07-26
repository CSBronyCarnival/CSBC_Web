<template>
  <div ref="rootRef" class="lazy-img">
    <Transition name="spinner-fade">
      <div v-if="spinnerVisible && !loaded" class="lazy-img-spinner"></div>
    </Transition>

    <img
      v-if="resolvedSrc"
      :src="resolvedSrc"
      :alt="alt"
      v-bind="$attrs"
      class="lazy-img-el"
      :class="{ 'img-loaded': loaded }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' }
})

const rootRef = ref(null)
const loaded = ref(false)
const spinnerVisible = ref(false)
const resolvedSrc = ref('')
let observer = null
let spinnerTimer = null

function startSpinnerTimer() {
  spinnerTimer = setTimeout(() => {
    spinnerVisible.value = true
  }, 2000)
}

function clearSpinnerTimer() {
  if (spinnerTimer) {
    clearTimeout(spinnerTimer)
    spinnerTimer = null
  }
}

function onLoad() {
  loaded.value = true
}

function onError() {
  loaded.value = true
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resolvedSrc.value = props.src
          startSpinnerTimer()
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '200px' }
  )

  if (rootRef.value) {
    observer.observe(rootRef.value)
  }
})

onUnmounted(() => {
  clearSpinnerTimer()
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.lazy-img {
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lazy-img-spinner {
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 1;
  width: 24px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #4fa7ff 94%, #0000) top / 6px 6px no-repeat,
    conic-gradient(#0000 30%, #4fa7ff);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 6px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 6px), #000 0);
  animation: lazy-spin 1s infinite linear;
}
@keyframes lazy-spin {
  100% { transform: rotate(1turn); }
}

.spinner-fade-enter-active,
.spinner-fade-leave-active {
  transition: opacity 0.25s ease;
}
.spinner-fade-enter-from,
.spinner-fade-leave-to {
  opacity: 0;
}

.lazy-img-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.lazy-img-el.img-loaded {
  opacity: 1;
}
</style>
