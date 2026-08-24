<template>
  <Transition name="loading-overlay">
    <div
      v-if="!isReady"
      class="loading-overlay"
      :class="{ night: isNight }"
      role="status"
      aria-live="polite"
      :aria-label="t('loading')"
    >
      <div class="loading-content">
        <div class="loading-spinner-slot" aria-hidden="true">
          <LoadingSpinner :visible="true" />
        </div>
        <p class="loading-text">{{ t('loading') }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { onNuxtReady } from '#app'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from './LoadingSpinner.vue'

const route = useRoute()
const { t } = useI18n()
const isReady = ref(false)
const isNight = computed(() => route.path.startsWith('/night'))
let readyFrame = 0

onNuxtReady(() => {
  readyFrame = window.requestAnimationFrame(() => {
    isReady.value = true
  })
})

onUnmounted(() => {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  transform: translateY(12px);
}

.loading-spinner-slot {
  position: relative;
  width: 24px;
  height: 24px;
}

.loading-text {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.loading-overlay-leave-active {
  transition: opacity 0.45s ease;
}

.loading-overlay-leave-to {
  opacity: 0;
}
</style>
