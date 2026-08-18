<template>
  <section class="about-section">
    <div class="container">
      <div class="about-row">
        <div class="about-text">
          <h3>{{ $t('night.title') }}</h3>
          <p v-html="$t('night.desc')"></p>
        </div>
        <div class="about-img">
          <ImgLazy src="/img/night/about.webp" :alt="$t('night.title')" />
          <p class="credit">{{ $t('night.credit') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  z-index: 1;
  padding: 100px 0;
  background: transparent;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.about-row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 52px;
}
.about-img {
  width: min(760px, 100%);
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
}
/* 覆盖 ImgLazy 内部浅色背景 */
.about-img :deep(.lazy-img) {
  background: #1e1e1e;
}
.credit {
  font-size: 12px;
  color: #6b6b6b;
  margin-top: 10px;
}
.about-text {
  width: min(760px, 100%);
  margin: 0 auto;
  text-align: left;
  font-size: 1.3rem;
  line-height: 1.95;
  color: #b0b0b0;
}
.about-text h3 {
  color: #e0e0e0;
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 600;
}
.about-text p {
  font-size: 1.3rem;
  margin-bottom: 25px;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 0;
  }
  .about-row {
    gap: 36px;
  }
  .about-img {
    width: 100%;
  }
  .about-text {
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
  }
  .about-text h3 {
    font-size: 1.8rem;
  }
  .about-text p {
    font-size: 1.1rem;
  }
}
</style>
