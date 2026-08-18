<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
useHead({ title: computed(() => t('pageTitle.night')) })
</script>

<template>
  <div class="night-page">
    <section class="night-hero">
      <div class="hero-content">
        <img src="/img/night/stickshort.webp" :alt="$t('night.hero')" class="hero-logo" />
      </div>
    </section>

    <NightAbout />
  </div>
</template>

<style scoped>
.night-page {
  background: #121212;
  min-height: 100vh;
}

.night-hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #1b1b1b;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero-logo {
  width: 350px;
  height: auto;
}

@media (max-width: 768px) {
  .night-hero { height: 100vh; }
  .hero-logo { width: 260px; }
}
</style>
