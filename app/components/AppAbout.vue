<template>
  <div class="about-content-wrapper">
    <div class="about-text">
      <h3>{{ $t('about.title') }}</h3>
      <div class="title-underline"></div>
      <p>{{ $t('about.slogan') }}</p>
      <p v-html="$t('about.desc')"></p>
      <BaseButton to="/contact" variant="section">{{ $t('about.contact') }}</BaseButton>
    </div>
    <div class="about-image">
      <ImgLazy src="/img/about.webp" alt="CSBC 关于" class="about-img" />
    </div>
  </div>
</template>

<style scoped>
.about-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}
.about-text h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}
.title-underline {
  width: 180px;
  height: 1px;
  background: #dfdfdf;
  margin-bottom: 20px;
}
.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 25px;
  text-align: left;
}
.about-image {
  flex: 0 0 auto;
  width: 500px;
}
.about-image :deep(.lazy-img) {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
}
.about-image :deep(.lazy-img-el) {
  width: 100%;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .about-content-wrapper {
    flex-direction: column;
    gap: 20px;
  }
  .about-image {
    width: 250px;
  }
}
</style>
