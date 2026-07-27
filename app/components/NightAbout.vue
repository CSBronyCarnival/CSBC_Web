<template>
  <section class="about-section">
    <div class="container">
      <div class="about-row">
        <div class="about-img">
          <ImgLazy src="/img/night/about.webp" :alt="$t('night.title')" />
          <p class="credit">{{ $t('night.credit') }}</p>
        </div>
        <div class="about-text">
          <h3>{{ $t('night.title') }}</h3>
          <p v-html="$t('night.desc')"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 100px 0;
  background: #1e1e1e;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.about-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}
.about-img {
  flex: 0 0 45%;
  overflow: hidden;
  margin-left: 40px;
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
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #b0b0b0;
}
.about-text h3 {
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}
.about-text p {
  margin-bottom: 25px;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 0;
  }
  .about-row {
    flex-direction: column;
    gap: 30px;
  }
  .about-img {
    flex: 0 0 100%;
    margin-left: 0;
  }
  .about-text {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
