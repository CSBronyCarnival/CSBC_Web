<template>
  <nav class="top-nav" :class="{ 'mobile-open': mobileOpen, collapsed: isCollapsed, night: isNight }">
    <div class="nav-inner">
      <div class="nav-links">
        <ClickTilt
          v-for="item in items"
          :key="item.id"
        >
          <NuxtLink
            :to="item.href"
            class="nav-link"
            :class="{ active: activeSection === item.id }"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </ClickTilt>
      </div>

      <button class="hamburger" @click="mobileOpen = !mobileOpen" aria-label="菜单">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <Transition name="drawer-fade">
      <div v-if="mobileOpen" class="mobile-drawer" @click.self="mobileOpen = false">
        <button class="mobile-close" @click="mobileOpen = false" aria-label="关闭菜单">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <ClickTilt
          v-for="(item, index) in items"
          :key="item.id"
        >
          <NuxtLink
            :to="item.href"
            class="mobile-link"
            :class="{ active: activeSection === item.id }"
            :style="{ '--i': index }"
            @click="mobileOpen = false"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </ClickTilt>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

useHead({
  style: [
    {
      innerHTML: `
        .top-nav .nav-inner{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        .top-nav.night .nav-inner{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        .mobile-drawer{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
        @media(max-width:768px){
          .top-nav .nav-inner{backdrop-filter:none;-webkit-backdrop-filter:none}
          .top-nav .hamburger{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        }
      `
    }
  ]
})

const route = useRoute()

const mobileOpen = ref(false)
const scrollY = ref(0)

const isCollapsed = computed(() => {
  return route.path === '/' && scrollY.value < 10
})

const isNight = computed(() => route.path.startsWith('/night'))

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

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
  { id: 'conbook', href: '/conbook',
    label: '场刊',
    icon: '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>' },
  { id: 'news', href: '/news',
    label: '展会消息',
    icon: '<path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>' },
  { id: 'night', href: '/night',
    label: '夜下扬蹄',
    icon: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>' },
]

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
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.nav-inner {
  width: fit-content;
  margin: 12px auto 0;
  padding: 0 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
  transition: transform 0.35s ease, opacity 0.35s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.top-nav.collapsed .nav-inner {
  transform: translateY(-54px);
}
.top-nav.collapsed .nav-inner:hover {
  transform: translateY(0);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
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
  background: rgba(0, 0, 0, 0.05);
}
.nav-link.active {
  background: rgba(79, 167, 255, 0.1);
  color: #3498db;
}

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
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.hamburger:hover {
  background: rgba(79, 167, 255, 0.1);
}

.top-nav.night .nav-inner {
  background: rgba(18, 18, 18, 0.85);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
.top-nav.night .nav-link {
  color: rgba(255, 255, 255, 0.7);
}
.top-nav.night .nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}
.top-nav.night .nav-link.active {
  background: rgba(79, 167, 255, 0.2);
  color: #4fa7ff;
}

@media (max-width: 768px) {
  .top-nav.night .hamburger {
    background: rgba(18, 18, 18, 0.85);
    color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  .top-nav.night .hamburger:hover {
    background: rgba(79, 167, 255, 0.9);
    color: #fff;
  }
}

.mobile-drawer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 32px;
  z-index: 999;
  pointer-events: auto;
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.2s ease, color 0.2s ease;
  min-width: 200px;
  justify-content: center;
  opacity: 0;
  animation: mobileLinkIn 0.4s ease forwards;
  animation-delay: calc(0.08s * var(--i));
}
.mobile-link:hover,
.mobile-link.active {
  background: rgba(79, 167, 255, 0.75);
  color: #fff;
}

.mobile-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.mobile-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes mobileLinkIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.drawer-fade-enter-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .top-nav {
    left: auto;
    right: 0;
    width: auto;
  }
  .nav-inner {
    max-width: none;
    height: auto;
    margin: 10px 10px 0 0;
    padding: 0;
    background: none;
    border-radius: 0;
    box-shadow: none;
  }
  .nav-links {
    display: none;
  }
  .hamburger {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .hamburger:hover {
    background: rgba(79, 167, 255, 0.9);
    color: #fff;
  }
  .top-nav.collapsed .nav-inner {
    transform: none;
    opacity: 1;
  }
}
</style>
