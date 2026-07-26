<template>
  <header class="hero" id="home">
    <div class="hero-bg">
      <img ref="heroBgRef" src="/img/hero-bg.jpg" alt="">
    </div>
    <div class="hero-image" ref="heroImageRef">
      <img ref="heroImgElRef" src="/img/csbc-line-w.svg" alt="">
    </div>
    <div class="hero-content" ref="heroContentRef">
      <div class="hero-content-inner hero-animation">
        <div class="hero-subtitle">
          <span class="line-left line-show"></span>
          <span class="subtitle-text">GuangZhou China</span>
          <span class="line-right line-show"></span>
        </div>
        <h1>华南马聚CSBC2026</h1>
        <p class="hero-poem">春风祥越五羊城 岭南山下友谊生</p>
        <p>2026.7.18-7.19 我在广州等你</p>
        <BaseButton href="https://qm.qq.com/q/kP0n8Mng9G" variant="hero">加入我们</BaseButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroBgRef = ref(null)
const heroImageRef = ref(null)
const heroContentRef = ref(null)
const heroImgElRef = ref(null)

function handleMouseMove(e) {
  const isMobile = window.innerWidth < 768
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  const bg = heroBgRef.value
  if (bg) {
    if (isMobile) {
      bg.style.transform = 'translate(-5%, -5%)'
    } else {
      const intensity = 15
      bg.style.transform = `translate(calc(-5% + ${(mouseX - 0.5) * intensity}px), calc(-5% + ${(mouseY - 0.5) * intensity}px))`
    }
  }

  const imgWrap = heroImageRef.value
  if (imgWrap) {
    if (isMobile) {
      imgWrap.style.transform = 'translate(-50%, -50%)'
    } else {
      const intensity = 25
      imgWrap.style.transform = `translate(calc(-50% + ${(mouseX - 0.5) * intensity}px), calc(-50% + ${(mouseY - 0.5) * intensity}px))`
    }
  }

  const content = heroContentRef.value
  if (content) {
    if (isMobile) {
      content.style.transform = 'translate(0, 0)'
    } else {
      const intensity = 30
      content.style.transform = `translate(${(mouseX - 0.5) * intensity}px, ${(mouseY - 0.5) * intensity}px)`
    }
  }

  const imgEl = heroImgElRef.value
  if (imgEl && !isMobile) {
    const rect = imgEl.getBoundingClientRect()
    imgEl.style.setProperty('--x', `${e.clientX - rect.left}px`)
    imgEl.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
}
.hero-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
}
.hero-bg img {
  width: 110%; height: 110%;
  object-fit: cover;
  transform: translate(-5%, -5%);
  will-change: transform;
  transition: transform 0.08s ease-out;
}
.hero-image {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  width: 900px;
  opacity: 0.2;
  will-change: transform;
  transition: transform 0.1s ease-out;
}
.hero-image img {
  width: 100%; height: auto;
  object-fit: contain;
  filter: brightness(1.2) drop-shadow(0 0 20px rgba(0,0,0,0.5));
  -webkit-mask-image: radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black 20%, rgba(0,0,0,0.25) 100%);
  mask-image: radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black 20%, rgba(0,0,0,0.25) 100%);
  animation: imageAnimation 8s cubic-bezier(0.00, 0.00, 0.00, 1.00) forwards;
}
@keyframes imageAnimation {
  0% { opacity: 0; transform: scale(0.95); }
  15% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
.hero-content {
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
  will-change: transform;
  transition: transform 0.12s ease-out;
}
.hero-content-inner {
  animation: titleAnimation 2s cubic-bezier(0.00, 0.00, 0.00, 1.00) forwards;
}
@keyframes titleAnimation {
  0% { opacity: 0; transform: scale(1.1); }
  15% { opacity: 0; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}
.hero-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.subtitle-text {
  color: #fff;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
}
.line-left, .line-right {
  height: 4px;
  border-radius: 3px;
  width: 0;
  background: #fff;
  margin: 0 15px;
  transition: width 1s cubic-bezier(0.00, 0.00, 0.00, 1.00);
}
.line-show {
  width: 60px;
}
.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}
.hero-poem {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .hero-content {
    max-width: 100%;
    padding: 0 24px;
  }
  .hero-content h1 {
    font-size: clamp(2rem, 6vw, 2.8rem);
    margin-bottom: 16px;
    line-height: 1.25;
  }
  .hero-poem {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  .hero-content p {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
  .subtitle-text {
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
  .line-show {
    width: 30px;
  }
  .line-left, .line-right {
    margin: 0 10px;
  }
  .hero-image {
    display: none;
  }
  .hero-bg img {
    object-position: 83% center;
  }
}
</style>
