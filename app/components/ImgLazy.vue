<template>
  <div ref="rootRef" class="lazy-img">
    <LoadingSpinner v-if="!noSpinner" :visible="spinnerVisible && !loaded" />

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
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  noSpinner: { type: Boolean, default: false }
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
          if (!props.noSpinner) startSpinnerTimer()
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
