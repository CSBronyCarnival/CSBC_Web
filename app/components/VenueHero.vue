<template>
  <div class="venue-hero">
    <img :src="src" :alt="alt">
    <div class="venue-hero-overlay">
      <svg v-if="icon" class="venue-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" v-html="icon"></svg>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<style scoped>
.venue-hero {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.venue-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.venue-hero::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}
.venue-hero-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}
.venue-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}
.venue-hero-overlay h1 {
  position: relative;
  z-index: 1;
  font-size: 2.8rem;
  color: #fff;
  margin-bottom: 5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.venue-hero-overlay p {
  position: relative;
  z-index: 1;
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .venue-hero {
    height: 280px;
  }
  .venue-hero-overlay h1 {
    font-size: 2rem;
  }
  .venue-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
