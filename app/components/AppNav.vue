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
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <use :href="`${item.icon}#icon`" />
            </svg>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </ClickTilt>
        <span class="nav-divider"></span>
        <ClickTilt :disabled="localeLoading">
          <button
            class="lang-btn"
            :disabled="localeLoading"
            :aria-busy="localeLoading"
            :aria-label="localeLoading ? $t('lang.loading') : $t('lang.switchTo')"
            @click="toggleLang"
          >
            <span v-if="localeLoading" class="lang-dots" aria-hidden="true">
              <span class="lang-dot"></span>
              <span class="lang-dot"></span>
              <span class="lang-dot"></span>
            </span>
            <span v-else>{{ $t('lang.switchTo') }}</span>
          </button>
        </ClickTilt>
      </div>

      <button class="hamburger" @click="mobileOpen = !mobileOpen" aria-label="菜单">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <use :href="`/img/page/${mobileOpen ? 'close' : 'menu'}.svg#icon`" />
        </svg>
      </button>
    </div>

    <Transition name="drawer-fade">
      <div v-if="mobileOpen" class="mobile-drawer" @click.self="mobileOpen = false">
        <button class="mobile-close" @click="mobileOpen = false" aria-label="关闭菜单">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <use href="/img/page/close.svg#icon" />
          </svg>
        </button>

        <div class="mobile-nav-links">
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
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <use :href="`${item.icon}#icon`" />
              </svg>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </ClickTilt>
        </div>

        <button
          class="mobile-lang-btn"
          :disabled="localeLoading"
          :aria-busy="localeLoading"
          :aria-label="localeLoading ? $t('lang.loading') : $t('lang.switchTo')"
          @click="handleMobileLangToggle"
        >
          <span v-if="localeLoading" class="lang-dots" aria-hidden="true">
            <span class="lang-dot"></span>
            <span class="lang-dot"></span>
            <span class="lang-dot"></span>
          </span>
          <span v-else>{{ $t('lang.switchTo') }}</span>
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

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
const { t, locale, setLocale } = useI18n()

const mobileOpen = ref(false)
const scrollY = ref(0)
const localeLoading = ref(false)

const isCollapsed = computed(() => {
  const isHomePage = route.path === '/'
  const isNightPage = route.path.startsWith('/night')
  return (isHomePage || isNightPage) && scrollY.value < 10
})

const isNight = computed(() => route.path.startsWith('/night'))

function onScroll() {
  scrollY.value = window.scrollY
}

async function toggleLang() {
  if (localeLoading.value) return

  const target = locale.value === 'zh' ? 'en' : 'zh'
  localeLoading.value = true

  try {
    await setLocale(target)
  } finally {
    localeLoading.value = false
  }
}

async function handleMobileLangToggle() {
  await toggleLang()
  mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const items = computed(() => [
  { id: 'home', href: '/',
    label: t('nav.home'),
    icon: '/img/page/home.svg' },
  { id: 'navigation', href: '/navigation',
    label: t('nav.venue'),
    icon: '/img/page/navigation.svg' },
  { id: 'ticket', href: '/ticket',
    label: t('nav.ticket'),
    icon: '/img/page/ticket.svg' },
  { id: 'gallery', href: '/gallery',
    label: t('nav.gallery'),
    icon: '/img/page/gallery.svg' },
  { id: 'conbook', href: '/conbook',
    label: t('nav.conbook'),
    icon: '/img/page/conbook.svg' },
  { id: 'news', href: '/news',
    label: t('nav.news'),
    icon: '/img/page/news.svg' },
  { id: 'night', href: '/night',
    label: t('nav.night'),
    icon: '/img/page/night.svg' },
])

const activeSection = computed(() => {
  const pageItem = items.value.find(item => {
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
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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

/* 语言切换按钮 - 桌面端 */
.nav-divider {
  width: 1px;
  height: 20px;
  background: rgba(0, 0, 0, 0.15);
  margin: 0 4px;
  flex-shrink: 0;
}
.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #555;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
  min-width: 44px;
}
.lang-btn:not(:disabled):hover {
  background: rgba(0, 0, 0, 0.05);
}
.lang-btn:disabled {
  cursor: wait;
}

.lang-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.lang-dot {
  width: 6px;
  height: 6px;
  background: #4fa7ff;
  animation: lang-dot-blink 1.4s ease-in-out infinite both;
}

.lang-dot:nth-child(1) { animation-delay: 0s; }
.lang-dot:nth-child(2) { animation-delay: 0.2s; }
.lang-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes lang-dot-blink {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}

.top-nav.night .nav-divider {
  background: rgba(255, 255, 255, 0.2);
}
.top-nav.night .lang-btn {
  color: rgba(255, 255, 255, 0.7);
}
.top-nav.night .lang-btn:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-lang-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
  z-index: 1000;
  animation: fadeInUp 0.35s ease forwards;
  min-width: 76px;
}
.mobile-lang-btn:hover {
  background: rgba(79, 167, 255, 0.7);
  border-color: rgba(79, 167, 255, 0.8);
}
.mobile-lang-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.12);
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
