<template>
  <div class="gallery-page">
    <SubpageHero title="画廊" subtitle="Gallery" icon='<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>' />

    <!-- viewerjs 全量图片容器（不可见，仅用于查看器导航） -->
    <div ref="viewerContainer" class="viewer-storage">
      <img v-for="(item, i) in items" :key="i" :src="item.src" :data-original="item.src">
    </div>

    <section class="gallery-section">
      <div class="container">
        <Transition name="gallery-fade" mode="out-in">
          <div class="gallery-grid" :key="currentPage">
            <div
              v-for="(item, i) in pagedItems"
              :key="item.src"
              class="gallery-item"
              @click="openViewer(items.indexOf(item))"
            >
              <img :src="item.src" :alt="item.name" loading="lazy">
              <div class="gallery-info">
                <div class="gallery-name">{{ item.name }}</div>
                <div class="gallery-author" v-if="item.author">{{ item.author }}</div>
              </div>
            </div>
          </div>
        </Transition>

        <div class="gallery-pagination">
          <button class="pagination-button" :disabled="currentPage <= 1" @click="prevPage">上一页</button>
          <div class="pagination-numbers">
            <button
              v-for="p in totalPages"
              :key="p"
              class="pagination-number"
              :class="{ active: p === currentPage }"
              @click="currentPage = p"
            >{{ p }}</button>
          </div>
          <button class="pagination-button" :disabled="currentPage >= totalPages" @click="nextPage">下一页</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
useHead({ title: 'CSBC华南马聚2026 - 画廊' })
import { ref, computed, onMounted } from 'vue'

const items = [
  { src: '/img/gallery/1.webp',  name: '马迷巴士',   author: '摄影：Ryazen' },
  { src: '/img/gallery/2.webp',  name: '机械甜贝儿', author: '摄影：Ryazen' },
  { src: '/img/gallery/3.webp',  name: '夜下扬蹄',   author: '摄影：Ryazen' },
  { src: '/img/gallery/4.webp',  name: '大合唱',     author: '摄影：Ryazen' },
  { src: '/img/gallery/5.webp',  name: '2025签名墙',  author: '摄影：Ryazen' },
  { src: '/img/gallery/6.webp',  name: '彩币拍卖',   author: '摄影：Ryazen' },
  { src: '/img/gallery/7.webp',  name: '小马堆',     author: '摄影：不屈骄阳' },
  { src: '/img/gallery/8.webp',  name: '摊位与签绘', author: '摄影：Ryazen' },
  { src: '/img/gallery/9.webp',  name: '舞台活动',   author: '摄影：Ryazen' },
  { src: '/img/gallery/10.webp', name: '游客互动',   author: '摄影：Ryazen' },
  { src: '/img/gallery/11.webp', name: '游客互动',   author: '摄影：Ryazen' },
  { src: '/img/gallery/12.webp', name: '2024签名墙',  author: '摄影：Ryazen' },
  { src: '/img/gallery/13.webp', name: '2025大合照' },
  { src: '/img/gallery/14.webp', name: '2024大合照' },
  { src: '/img/gallery/15.webp', name: '2023大合照' },
  { src: '/img/gallery/16.webp', name: '2022大合照' },
  { src: '/img/gallery/17.webp', name: '插图',       author: '牛奶' },
  { src: '/img/gallery/18.webp', name: '插图',       author: '牛奶' },
]

const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(items.length / itemsPerPage))

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return items.slice(start, start + itemsPerPage)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// viewerjs 全屏查看器
const viewerContainer = ref(null)
let viewerInstance = null

onMounted(async () => {
  const Viewer = (await import('viewerjs')).default
  viewerInstance = new Viewer(viewerContainer.value, {
    zIndex: 9999,
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 4,
      next: 4,
      play: false,
      flipHorizontal: 4,
      flipVertical: 4,
    },
  })
})

function openViewer(index) {
  viewerInstance?.view(index)
}
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* viewer 存储容器（不可见但保持图片加载） */
.viewer-storage {
  height: 0;
  overflow: hidden;
  visibility: hidden;
  position: absolute;
}

/* ===== Gallery Grid ===== */
.gallery-section {
  padding: 80px 0;
}
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.3s ease;
}
.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}
.gallery-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4 / 3;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  display: block;
}
.gallery-item:hover img {
  transform: scale(1.08);
}
.gallery-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 16px 14px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gallery-item:hover .gallery-info {
  opacity: 1;
}
.gallery-name {
  font-size: 1rem;
  font-weight: 600;
}
.gallery-author {
  font-size: 0.85rem;
  opacity: 0.85;
  margin-top: 2px;
}

/* ===== Pagination ===== */
.gallery-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}
.pagination-button {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.pagination-button:hover:not(:disabled) {
  background: #4fa7ff;
  color: white;
  border-color: #4fa7ff;
}
.pagination-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.pagination-numbers {
  display: flex;
  gap: 6px;
}
.pagination-number {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.pagination-number:hover,
.pagination-number.active {
  background: #4fa7ff;
  color: white;
  border-color: #4fa7ff;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .gallery-section {
    padding: 50px 0;
  }
  .gallery-pagination {
    gap: 8px;
  }
}
</style>
