<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHead({ title: computed(() => t('pageTitle.night')) })

const nightHeroRef = ref(null)
</script>

<template>
  <div class="night-page">
    <NightStarBackground :scroll-target="nightHeroRef" />

    <section ref="nightHeroRef" class="night-hero">
      <div class="hero-content">
        <img src="/img/night/stickshort.webp" :alt="$t('night.hero')" class="hero-logo" />
      </div>
    </section>

    <NightAbout />
    <NightMusicians />
    <NightMore />
  </div>
</template>

<style scoped>
.night-page {
  position: relative;
  min-height: 100vh;
  background: #121212;
}

.night-hero {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow: hidden;
  background: transparent;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
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
