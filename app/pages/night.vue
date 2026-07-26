<template>
  <div class="night-page">
    <section class="night-hero">
      <div class="hero-content">
        <img src="/img/night/stickshort.webp" alt="夜下扬蹄" class="hero-logo" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.night-page {
  background: #121212;
  min-height: 100vh;
}

.night-hero {
  height: 750px;
  position: relative;
  overflow: hidden;
  background: #1b1b1b;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero-logo {
  width: 350px;
  height: auto;
}

@media (max-width: 768px) {
  .night-hero { height: 500px; }
  .hero-logo { width: 260px; }
}
</style>
