<template>
  <Transition name="loading-overlay">
    <div
      v-if="!isReady"
      class="loading-overlay"
      :class="{ night: isNight }"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="loading-content">
        <div class="loading-spinner-slot" aria-hidden="true">
          <LoadingSpinner :visible="true" />
        </div>
        <p v-if="showSlowMessage" class="loading-slow-message">
          {{ t('loading.slow') }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onNuxtReady } from '#app'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from './LoadingSpinner.vue'

const route = useRoute()
const { t } = useI18n()
const isReady = ref(false)
const isNight = computed(() => route.path.startsWith('/night'))
const showSlowMessage = ref(false)
const SLOW_LOADING_DELAY = 5000
let readyFrame = 0
let slowLoadingTimer = 0

onMounted(() => {
  slowLoadingTimer = window.setTimeout(() => {
    showSlowMessage.value = true
  }, SLOW_LOADING_DELAY)
})

onNuxtReady(() => {
  if (slowLoadingTimer) window.clearTimeout(slowLoadingTimer)
  readyFrame = window.requestAnimationFrame(() => {
    isReady.value = true
  })
})

onUnmounted(() => {
  if (slowLoadingTimer) window.clearTimeout(slowLoadingTimer)
  if (readyFrame) window.cancelAnimationFrame(readyFrame)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  background: #fff;
  color: #34495e;
}

.loading-overlay.night {
  background: #121212;
  color: rgba(255, 255, 255, 0.85);
}

.loading-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(80vw, 360px);
  min-height: 24px;
}

.loading-spinner-slot {
  position: relative;
  width: 24px;
  height: 24px;
}

.loading-slow-message {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  width: 100%;
  margin: 0;
  color: #d99a00;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  transform: translateX(-50%);
  animation: loading-slow-message-fade-in 0.45s ease both;
}

.loading-overlay.night .loading-slow-message {
  color: #ffd34d;
}

@keyframes loading-slow-message-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.loading-overlay-leave-active {
  transition: opacity 0.45s ease;
}

.loading-overlay-leave-to {
  opacity: 0;
}
</style>
