<template>
  <nav class="side-nav nav-visible">
    <a
      v-for="item in items"
      :key="item.id"
      :href="item.href"
      class="nav-btn"
      :class="{ active: activeSection === item.id }"
      :title="item.label"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<script setup>
defineProps({
  activeSection: { type: String, default: 'home' }
})

const items = [
  {
    id: 'home',
    href: '#home',
    label: '首页',
    icon: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>'
  },
  {
    id: 'ticket',
    href: '#ticket',
    label: '票价',
    icon: '<path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>'
  }
]
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
