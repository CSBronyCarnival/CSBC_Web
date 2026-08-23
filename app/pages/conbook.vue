<template>
  <div class="conbook-page">
    <SubpageHero
      :title="$t('conbook.hero')"
      :subtitle="$t('conbook.heroSub')"
      icon="/img/page/conbook.svg"
    />

    <section class="conbook-section">
      <div class="conbook-container">
        <FlipBook pdf-url="/pdf/2026.pdf" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
useHead({ title: computed(() => t('pageTitle.conbook')) })
</script>

<style scoped>
.conbook-page {
  min-height: 100vh;
  overflow-x: hidden;
}
.conbook-section {
  padding: 40px 0 80px;
  overflow-x: hidden;
}
.conbook-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .conbook-section {
    padding: 20px 0 60px;
  }
  .conbook-container {
    padding: 0 16px;
  }
}
</style>
