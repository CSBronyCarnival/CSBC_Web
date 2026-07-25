<template>
  <div class="news-article-page">
    <SubpageHero title="展会消息" subtitle="News" />

    <div v-if="article" class="article-container">
      <article class="news-article">
        <div class="news-hero-image">
          <img :src="article.hero" :alt="article.title">
        </div>
        <div class="news-header">
          <span class="news-publish-date">{{ article.date }}</span>
          <h1 class="news-main-title">{{ article.title }}</h1>
        </div>
        <div class="news-divider"></div>
        <div class="news-content" v-html="article.content"></div>
        <div v-if="article.images.length > 1" class="news-article-images">
          <img
            v-for="(src, i) in article.images"
            :key="i"
            :src="src"
            :alt="`${article.title} ${i + 1}`"
            loading="lazy"
          >
        </div>
      </article>
    </div>

    <div v-else class="not-found">
      <p>未找到该文章</p>
      <NuxtLink to="/news" class="back-btn">&larr; 返回展会消息</NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { newsList } from '~/data/news'

const route = useRoute()
const article = computed(() => newsList.find(n => n.id === route.params.id))
</script>

<style scoped>
.news-article-page {
  min-height: 100vh;
}
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== Article ===== */
.news-article {
  padding: 60px 0;
  background: #ffffff;
}
.news-hero-image {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 30px;
  border-radius: 8px;
  overflow: hidden;
  line-height: 0;
}
.news-hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.news-header {
  max-width: 1200px;
  margin: 0 auto 30px;
  text-align: left;
}
.news-publish-date {
  display: block;
  font-size: 1rem;
  color: #3498db;
  margin-bottom: 15px;
  font-weight: 500;
}
.news-main-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
  font-weight: 600;
}
.news-divider {
  max-width: 1200px;
  margin: 0 auto 40px;
  height: 1px;
  background: #e0e0e0;
}
.news-content {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}
.news-content strong {
  color: #2c3e50;
  font-weight: 600;
}
.news-article-images {
  max-width: 1200px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.news-article-images img {
  border-radius: 8px;
  width: 100%;
  height: auto;
  max-width: 600px;
}

/* ===== Back Link ===== */
.back-link {
  text-align: left;
  padding-top: 40px;
}
.back-btn {
  display: inline-block;
  padding: 10px 24px;
  background: #4fa7ff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}
.back-btn:hover {
  background: #3d8ce0;
}

/* ===== Not Found ===== */
.not-found {
  text-align: center;
  padding: 100px 20px;
}
.not-found p {
  font-size: 1.2rem;
  color: #999;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .news-article {
    padding: 40px 0;
  }
  .news-hero-image img {
    height: 250px;
  }
  .news-main-title {
    font-size: 2rem;
  }
  .news-content {
    font-size: 1rem;
    padding: 0 20px;
  }
  .news-header {
    padding: 0 20px;
  }
}
</style>
