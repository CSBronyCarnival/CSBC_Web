<template>
  <div class="venue-content">
    <div class="venue-image">
      <ImgLazy src="/img/venue/main.webp" alt="广州瑞士酒店" class="venue-img" />
    </div>
    <div class="venue-description">
      <h3>{{ $t('venue.name') }} <span>{{ $t('venue.subtitle') }}</span></h3>
      <div class="title-underline"></div>
      <h4 v-if="$t('venue.address')">{{ $t('venue.address') }}</h4>
      <p v-html="$t('venue.desc')"></p>
      <BaseButton to="/navigation" variant="section">{{ $t('venue.button') }}</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.venue-content {
  display: flex;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.venue-image {
  flex: 1;
  max-width: 500px;
}
.venue-image :deep(.lazy-img) {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
}
.venue-image :deep(.lazy-img-el) {
  width: 100%;
  border-radius: 10px;
}
.venue-description {
  flex: 1;
}
.venue-description h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}
.venue-description h3 span {
  display: block;
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 400;
  font-style: italic;
  margin-top: 4px;
}
.venue-description h4 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #696969;
  font-weight: 400;
}
.venue-description p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}
.title-underline {
  width: 180px;
  height: 1px;
  background: #dfdfdf;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .venue-content {
    flex-direction: column;
    gap: 30px;
  }
  .venue-image {
    max-width: 100%;
    order: -1;
  }
}
</style>
