<template>
  <div class="conbook-page">
    <SubpageHero
      title="场刊"
      subtitle="Con Book"
      icon='<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>'
    />

    <section class="conbook-section">
      <div class="conbook-container">
        <FlipBook pdf-url="/pdf/2026.pdf" />
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({ title: 'CSBC华南马聚2026 - 场刊' })
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
