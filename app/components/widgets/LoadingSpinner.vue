<template>
  <Transition name="spinner-fade">
    <div v-if="visible" class="loading-spinner"></div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false }
})
</script>

<style scoped>
.loading-spinner {
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
</style>
