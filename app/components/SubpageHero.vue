<template>
  <header class="subpage-hero">
    <div class="dash-line"></div>
    <div class="subpage-hero-content">
      <svg v-if="icon" class="subpage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-html="icon"></svg>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<style scoped>
.subpage-hero {
  position: relative;
  overflow: hidden;
  padding: 14px 0 18px;
}

/* 顶部蓝色动态虚线 */
.dash-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 5px;
  background: repeating-linear-gradient(90deg, #aaddff, #aaddff 10px, transparent 10px, transparent 20px);
  animation: dashLineMove 60s linear infinite;
}
@keyframes dashLineMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.subpage-hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #3b3b3b;
}
.subpage-icon {
  position: absolute;
  top: 58%;
  transform: translateY(-50%) rotate(-35deg);
  left: -45px;
  width: 100px;
  height: 100px;
  stroke-width: 2.5;
  color: rgba(0, 0, 0, 0.08);
  pointer-events: none;
}
.subpage-hero h1 {
  font-size: 2rem;
  margin: 0;
  position: relative;
  z-index: 1;
}
.subpage-hero p {
  font-size: 1rem;
  margin: 0;
  color: #7f8c8d;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .subpage-hero {
    padding: 18px 0 12px;
  }
  .subpage-hero h1 {
    font-size: 2rem;
  }
  .subpage-hero p {
    font-size: 1rem;
  }
  .subpage-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
