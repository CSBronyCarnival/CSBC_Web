<template>
  <div class="venue-content">
    <div class="venue-image">
      <ImgLazy src="/img/venue/full.webp" alt="广州瑞士酒店" class="venue-img-wide" />
      <ImgLazy src="/img/venue/main.webp" alt="广州瑞士酒店" class="venue-img-portrait" />
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
  flex-direction: column;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.venue-image {
  position: relative;
  width: min(760px, 100%);
}
.venue-image :deep(.lazy-img:first-child) {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
}
.venue-image :deep(.lazy-img:last-child) {
  position: absolute;
  right: -48px;
  bottom: -70px;
  width: 38%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
}
.venue-description {
  margin-top: 110px;
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
    gap: 30px;
  }
  .venue-image :deep(.lazy-img:last-child) {
    width: 45%;
    bottom: -50px;
    right: 0;
  }
  .venue-description {
    margin-top: 80px;
  }
}
</style>
