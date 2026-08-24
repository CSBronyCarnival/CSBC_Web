<template>
  <div class="venue-feature-item">
    <div class="venue-feature-image">
      <ImgLazy :src="imgSrc" class="venue-img" />
    </div>
    <div class="venue-feature-subtitle">{{ subtitle }}</div>
    <h3 class="venue-feature-title">{{ title }}</h3>
    <p class="venue-feature-description">{{ description }}</p>
    <BaseButton :href="buttonHref" variant="section">{{ buttonText }}</BaseButton>
  </div>
</template>

<script setup>
defineProps({
  imgSrc: { type: String, required: true },
  subtitle: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  buttonHref: { type: String, required: true },
  buttonText: { type: String, default: '立即订房' }
})
</script>

<style scoped>
.venue-feature-item {
  text-align: center;
}
.venue-feature-image {
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 15px;
}
.venue-feature-image :deep(.lazy-img),
.venue-feature-image :deep(.lazy-img-el) {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}
.venue-feature-subtitle {
  font-size: 1rem;
  color: #4fa7ff;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.venue-feature-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
}
.venue-feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 15px;
}

@media (max-width: 768px) {
  .venue-feature-image :deep(.lazy-img),
  .venue-feature-image :deep(.lazy-img-el) {
    height: 180px;
  }
  .venue-feature-title {
    font-size: 1.3rem;
  }
}
</style>
