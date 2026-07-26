<template>
  <div class="news-index-page">
    <section class="news-section">
      <div class="container">
        <div class="news-grid">
          <div v-for="item in newsList" :key="item.id" class="news-item">
            <NuxtLink :to="`/news/${item.id}`" class="news-image-link">
              <ImgLazy :src="item.cover" :alt="item.title" class="news-image" />
            </NuxtLink>
            <div class="news-info">
              <span class="news-date">{{ item.date }}</span>
              <h3 class="news-title">{{ item.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
useHead({ title: 'CSBC华南马聚2026 - 展会消息' })
import { newsList } from '~/data/news'
</script>

<style scoped>
.news-index-page {
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== News Grid ===== */
.news-section {
  padding: 80px 0;
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
.news-item {
  overflow: hidden;
}
.news-image-link {
  display: block;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
}
.news-image-link :deep(.lazy-img) {
  width: 100%;
  height: 100%;
}
.news-image-link :deep(.lazy-img-el) {
  transition: opacity 0.4s ease, transform 0.3s ease;
}
.news-image-link:hover :deep(.lazy-img-el) {
  transform: scale(1.05);
}
.news-info {
  padding: 20px;
}
.news-date {
  display: block;
  font-size: 0.9rem;
  color: #3498db;
  margin-bottom: 8px;
  font-weight: 500;
}
.news-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .news-image-link {
    height: 250px;
  }
  .news-section {
    padding: 50px 0;
  }
}
</style>
