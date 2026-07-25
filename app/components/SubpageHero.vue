<template>
  <header class="subpage-hero">
    <div class="subpage-hero-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.subpage-hero {
  height: 280px;
  position: relative;
  overflow: hidden;
  background-color: #e2f1ff;
}
.subpage-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 5px;
  background: repeating-linear-gradient(90deg, white, white 10px, transparent 10px, transparent 20px);
  animation: dashLineMove 60s linear infinite;
}
@keyframes dashLineMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.subpage-hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #3b3b3b;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
}
.subpage-hero h1 {
  font-size: 2.4rem;
  margin-bottom: 5px;
  margin-top: 30px;
}
.subpage-hero p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .subpage-hero h1 {
    font-size: 2rem;
  }
  .subpage-hero p {
    font-size: 1rem;
  }
}
</style>
