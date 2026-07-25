<template>
  <nav class="side-nav nav-visible">
    <span
      v-for="item in items"
      :key="item.id"
      class="nav-btn"
      :class="{ active: activeSection === item.id }"
      :title="item.label"
      @click="navigate(item)"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
      <span>{{ item.label }}</span>
    </span>
  </nav>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const activeSection = ref('home')

const items = [
  {
    id: 'home',
    href: '/',
    label: '首页',
    icon: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>'
  },
  {
    id: 'navigation',
    href: '/navigation',
    label: '场地',
    icon: '<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>'
  },
  {
    id: 'ticket',
    href: '/ticket',
    label: '票价',
    icon: '<path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>'
  },
  {
    id: 'gallery',
    href: '/gallery',
    label: '画廊',
    icon: '<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>'
  }
]

const router = useRouter()
const route = useRoute()

function navigate(item) {
  router.push(item.href)
}

let observer = null

// 根据路由更新高亮，未匹配时全部取消激活
function updateActiveByRoute() {
  const pageItem = items.find(item => item.href === route.path)
  if (pageItem) activeSection.value = pageItem.id
  else activeSection.value = ''
}

// 重建滚动监听（路由切换后页面 DOM 元素会变）
function setupObserver() {
  if (observer) observer.disconnect()
  const anchors = items.filter(item => item.href.startsWith('/#'))
  const ids = ['home', ...anchors.map(i => i.id)]
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })
  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  updateActiveByRoute()
  setupObserver()
})

// 路由切换时更新高亮 + 重建 observer
watch(() => route.path, () => {
  updateActiveByRoute()
  nextTick(setupObserver)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.side-nav {
  position: fixed;
  bottom: 40px;
  left: 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.side-nav.nav-visible {
  opacity: 1;
  transform: translateY(0);
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(200, 200, 200, 0.4);
  border-radius: 10px;
  text-decoration: none;
  color: #000;
  font-size: 0.85rem;
  font-weight: 500;
  width: auto;
  min-width: 40px;
  max-width: 40px;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease, gap 0.3s ease;
}
.nav-btn svg {
  flex-shrink: 0;
  display: block;
}
.nav-btn span {
  opacity: 0;
  transition: opacity 0.25s ease;
}
.nav-btn:hover,
.nav-btn.active {
  max-width: 180px;
  background: rgba(79, 167, 255, 0.9);
  color: #fff;
  border-color: rgba(79, 167, 255, 0.9);
  gap: 8px;
}
.nav-btn:hover span,
.nav-btn.active span {
  opacity: 1;
}

@media (max-width: 768px) {
  .side-nav {
    left: 15px;
    bottom: 20px;
    gap: 4px;
  }
  .nav-btn {
    padding: 6px 8px;
    font-size: 0.8rem;
    min-width: 36px;
    max-width: 36px;
  }
  .nav-btn span {
    display: none;
  }
  .nav-btn:hover {
    width: auto;
  }
  .nav-btn:hover span {
    display: inline;
  }
}
</style>
