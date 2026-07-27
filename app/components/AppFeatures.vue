<template>
  <section class="features-section">
    <div class="container">
      <div class="features-header">
        <div class="features-subtitle">{{ $t('features.subtitle') }}</div>
        <h2>{{ $t('features.title') }}</h2>
        <p class="features-description" v-html="$t('features.desc')"></p>
      </div>
      <div class="features-list">
        <div v-for="(item, idx) in featureIcons" :key="idx" class="feature-item">
          <div class="feature-icon"><img :src="item.icon"></div>
          <h3>{{ $t('features.items')[idx].title }}</h3>
          <p>{{ $t('features.items')[idx].desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const featureIcons = [
  { icon: '/img/features/1.svg' },
  { icon: '/img/features/2.svg' },
  { icon: '/img/features/3.svg' },
  { icon: '/img/features/4.svg' },
]
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.features-section {
  padding: 40px 0;
}
.features-header {
  text-align: left;
  margin-bottom: 60px;
}
.features-subtitle {
  font-size: 1.1rem;
  color: #4fa7ff;
  margin-bottom: 5px;
  font-weight: 600;
}
.features-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 5px;
  font-weight: 700;
}
.features-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
}
.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
.feature-item {
  padding: 20px;
  text-align: center;
}
.feature-icon {
  width: 80px; height: 80px;
  background: #e6f4ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
}
.feature-icon img {
  width: 40px;
  height: auto;
}
.feature-item h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}
.feature-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  .features-header h2 {
    font-size: 2rem;
  }
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
