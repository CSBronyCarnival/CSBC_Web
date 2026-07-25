<template>
  <nav class="top-nav" :class="{ 'mobile-open': mobileOpen }">
    <div class="nav-inner">
      <!-- 桌面端导航链接 -->
      <div class="nav-links">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="item.href"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>

      <!-- 移动端汉堡按钮 -->
      <button class="hamburger" @click="mobileOpen = !mobileOpen" aria-label="菜单">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <!-- 移动端抽屉菜单 -->
    <Transition name="drawer-slide">
      <div v-if="mobileOpen" class="mobile-drawer">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="item.href"
          class="mobile-link"
          :class="{ active: activeSection === item.id }"
          @click="mobileOpen = false"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </Transition>

    <!-- 移动端遮罩 -->
    <Transition name="overlay-fade">
      <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false" />
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const route = useRoute()

const mobileOpen = ref(false)

const items = [
  { id: 'home', href: '/',
    label: '首页',
    icon: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { id: 'navigation', href: '/navigation',
    label: '场地',
    icon: '<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>' },
  { id: 'ticket', href: '/ticket',
    label: '票价',
    icon: '<path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>' },
  { id: 'gallery', href: '/gallery',
    label: '画廊',
    icon: '<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>' },
  { id: 'news', href: '/news',
    label: '展会消息',
    icon: '<path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>' }
]

// 路由匹配高亮
const activeSection = computed(() => {
  const pageItem = items.find(item => {
    if (item.href === route.path) return true
    if (item.href !== '/') {
      const prefix = item.href.endsWith('/') ? item.href : item.href + '/'
      return route.path.startsWith(prefix)
    }
    return false
  })
  return pageItem ? pageItem.id : ''
})

// 路由切换时关闭移动端菜单
watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<style scoped>
/* ===== 导航容器 ===== */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.nav-inner {
  max-width: 600px;
  margin: 12px auto 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
}

/* ===== 桌面导航链接 ===== */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav-link svg {
  flex-shrink: 0;
}
.nav-link:hover {
  background: rgba(79, 167, 255, 0.1);
  color: #3498db;
}
.nav-link.active {
  background: rgba(79, 167, 255, 0.9);
  color: #fff;
}

/* ===== 汉堡按钮（仅移动端） ===== */
.hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #555;
  cursor: pointer;
  transition: background 0.2s ease;
}
.hamburger:hover {
  background: rgba(79, 167, 255, 0.1);
}

/* ===== 移动端抽屉 ===== */
.mobile-drawer {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 999;
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}
.mobile-link:hover,
.mobile-link.active {
  background: rgba(79, 167, 255, 0.9);
  color: #fff;
}

/* 移动端遮罩 */
.mobile-overlay {
  position: fixed;
  inset: 0;
  top: 60px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}

/* ===== 动画 ===== */
.drawer-slide-enter-active {
  transition: all 0.3s ease;
}
.drawer-slide-leave-active {
  transition: all 0.25s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.overlay-fade-enter-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* ===== 移动端响应式 ===== */
@media (max-width: 768px) {
  .nav-inner {
    max-width: calc(100% - 32px);
    height: 44px;
    border-radius: 12px;
    margin: 10px auto 0;
    padding: 0 12px;
    justify-content: flex-end;
  }
  .nav-links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .mobile-drawer {
    top: 54px;
  }
  .mobile-overlay {
    top: 54px;
  }
}
</style>
