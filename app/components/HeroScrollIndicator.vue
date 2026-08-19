<template>
  <div
    class="hero-scroll-indicator"
    :class="{ 'is-hidden': hidden }"
    aria-hidden="true"
  >
    <span>{{ label }}</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  hidden: { type: Boolean, default: false },
  label: { type: String, required: true },
})
</script>

<style scoped>
.hero-scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: max(24px, env(safe-area-inset-bottom));
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  letter-spacing: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.65);
  transform: translateX(-50%);
  opacity: 1;
  visibility: visible;
  pointer-events: none;
  transition: opacity 0.45s ease, visibility 0.45s ease;
}

.hero-scroll-indicator.is-hidden {
  opacity: 0;
  visibility: hidden;
}

.hero-scroll-indicator svg {
  width: 22px;
  height: 22px;
  animation: heroScrollIndicator 1.8s ease-in-out infinite;
}

@keyframes heroScrollIndicator {
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(5px); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll-indicator {
    transition-duration: 0.01ms;
  }

  .hero-scroll-indicator svg {
    animation: none;
  }
}
</style>
