<template>
  <footer class="footer" :class="{ night: isNight }">
    <div class="footer-image">
      <img ref="footerImgRef" :src="isNight ? '/img/csbc-line.svg' : '/img/csbc-line-w.svg'">
    </div>
    <div class="footer-container">
      <div class="footer-left">
        <div class="footer-logo">
          <NuxtLink href="/"><img src="/img/logo.png"></NuxtLink>
        </div>
        <div class="footer-social">
          <a href="https://space.bilibili.com/371768934" target="_blank" class="social-link"><img :src="nightSrc('/img/link/bili.svg')" alt="Bilibili"></a>
          <a href="https://qm.qq.com/q/kP0n8Mng9G" target="_blank" class="social-link"><img :src="nightSrc('/img/link/qq.svg')" alt="QQ"></a>
          <a href="https://x.com/csbronycarnival" target="_blank" class="social-link"><img :src="nightSrc('/img/link/x.svg')" alt="X"></a>
          <a href="https://www.youtube.com/@lywings1" target="_blank" class="social-link"><img :src="nightSrc('/img/link/youtube.svg')" alt="YouTube"></a>
          <a href="https://discord.com/invite/mbNkveehRB" target="_blank" class="social-link"><img :src="nightSrc('/img/link/discord.svg')" alt="Discord"></a>
          <a href="https://github.com/CSBronyCarnival" target="_blank" class="social-link"><img :src="nightSrc('/img/link/github.svg')" alt="GitHub"></a>
          <a href="https://gitee.com/CSBronyCarnival" target="_blank" class="social-link"><img :src="nightSrc('/img/link/gitee.svg')" alt="Gitee"></a>
        </div>
        <div class="footer-copyright">
          <p>&copy; 2022-2025 CSBronyCarnival<br><a href="https://github.com/CSBronyCarnival/CSBC_Web" target="_blank">{{ $t('footer.sourceCode') }}</a></p>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-links-title"><p>{{ $t('footer.friendLinks') }}</p></div>
        <ul class="footer-links">
          <li v-for="link in friendLinks" :key="link.id">
            <a target="_blank" :href="link.href">
              <img
                :src="friendImageSrc(link)"
                class="friend-link-img"
                :class="{ 'is-fading': isFriendImageFading(link) }"
                @mouseenter="scheduleFriendImageSwap(link, true)"
                @mouseleave="scheduleFriendImageSwap(link, false)"
              >
            </a>
          </li>
        </ul>
        <div class="footer-record">
          <p><a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2024035737号</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const footerImgRef = ref(null)
const friendImageStates = ref({})
const friendImageTimers = new Map()

const friendLinks = [
  { id: 'malang', href: 'https://malangpony.com/', src: '/img/link/exchange/malang_b.png', hoverSrc: '/img/link/exchange/malang.png' },
  { id: 'bs', href: 'https://brony.scot/', src: '/img/link/exchange/bs_b.png', hoverSrc: '/img/link/exchange/bs.png' },
  { id: 'norse', href: 'https://www.norsehorsecon.eu/', src: '/img/link/exchange/norse_b.webp', hoverSrc: '/img/link/exchange/norse.webp' },
  { id: 'gala', href: 'https://galacon.eu/', src: '/img/link/exchange/gala_b.webp', hoverSrc: '/img/link/exchange/gala.webp' },
  { id: 'ssc', href: 'http://suncelebration.butterpony.com/', src: '/img/link/exchange/ssc_b.webp', hoverSrc: '/img/link/exchange/ssc.webp' },
  { id: 'ponikon', href: 'https://x.com/Poniko_MLP/', src: '/img/link/exchange/ponikon_b.webp', hoverSrc: '/img/link/exchange/ponikon.webp' },
  { id: 'spc', href: 'https://sunshine.horse/', src: '/img/link/exchange/spc_b.webp', hoverSrc: '/img/link/exchange/spc.webp' },
  { id: 'derpfest', href: 'https://derpfest.ru/', src: '/img/link/exchange/derpfest_b.svg', hoverSrc: '/img/link/exchange/derpfest.svg' },
  { id: 'twbc', href: 'https://twbronycon.org/', src: '/img/link/exchange/twbc_b.png', hoverSrc: '/img/link/exchange/twbc.png' },
  { id: 'dlc', href: 'https://dreamlandcon.top/', src: '/img/link/exchange/dlc_b.svg', hoverSrc: '/img/link/exchange/dlc.svg' },
  { id: 'eqcn', href: 'https://www.equestriacn.com/', src: '/img/link/exchange/eqcn_b.png', hoverSrc: '/img/link/exchange/eqcn.png' },
]

const isNight = computed(() => route.path.startsWith('/night'))

function nightSrc(src) {
  if (!isNight.value) return src
  const replaced = src.replace(/_b\.([^.]+)$/, '_w.$1')
  if (replaced !== src) return replaced
  return src.replace(/\.([^.]+)$/, '_w.$1')
}

function friendImageSrc(link) {
  return friendImageStates.value[link.id]?.src ?? nightSrc(link.src)
}

function isFriendImageFading(link) {
  return friendImageStates.value[link.id]?.fading ?? false
}

function clearFriendImageTimers() {
  friendImageTimers.forEach(timer => window.clearTimeout(timer))
  friendImageTimers.clear()
}

function scheduleFriendImageSwap(link, hovered) {
  const currentTimer = friendImageTimers.get(link.id)
  if (currentTimer) window.clearTimeout(currentTimer)

  friendImageStates.value = {
    ...friendImageStates.value,
    [link.id]: { src: friendImageSrc(link), fading: true },
  }

  const timer = window.setTimeout(() => {
    friendImageStates.value = {
      ...friendImageStates.value,
      [link.id]: {
        src: hovered ? link.hoverSrc : nightSrc(link.src),
        fading: false,
      },
    }
    friendImageTimers.delete(link.id)
  }, 150)

  friendImageTimers.set(link.id, timer)
}

function handleFooterMove(e) {
  const img = footerImgRef.value
  if (!img) return
  const isMobile = window.innerWidth < 768
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight
  if (isMobile) {
    img.style.transform = 'translateY(30%)'
  } else {
    const intensity = 15
    img.style.transform = `translateY(30%) translate(${(mouseX - 0.5) * intensity}px, ${(mouseY - 0.5) * intensity}px)`
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleFooterMove)
})

watch(isNight, () => {
  clearFriendImageTimers()
  friendImageStates.value = {}
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleFooterMove)
  clearFriendImageTimers()
})
</script>

<style scoped>
.footer {
  background: #e2f1ff;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}
.footer.night {
  background: #0a0a0a;
}
.footer.night .footer-copyright a,
.footer.night .footer-copyright p {
  color: #909090;
}
.footer.night .footer-links-title {
  color: #909090;
}
.footer.night .footer-record p,
.footer.night .footer-record a {
  color: #909090;
}
.footer.night .footer-links a:hover,
.footer.night .footer-copyright a:hover,
.footer.night .footer-record a:hover {
  color: #7ccbff;
}
.footer-image {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}
.footer-image img {
  width: 100%;
  height: auto;
  transform: translateY(30%);
  will-change: transform;
  transition: transform 0.08s ease-out;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer-logo img {
  height: 40px;
  margin-bottom: 10px;
}
.footer-social {
  display: flex;
  margin-left: -8px;
  margin-bottom: 15px;
}
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  transition: opacity 0.3s ease;
}
.social-link:hover {
  opacity: 0.7;
}
.social-link img {
  width: 20px; height: 20px;
  opacity: 0.9;
}
.footer-copyright a,
.footer-copyright p {
  margin: 0;
  font-size: 0.9rem;
  color: #202020;
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-right {
  text-align: right;
}
.footer-links-title {
  color: #202020;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
.footer-links {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
  max-width: 500px;
  justify-content: flex-end;
}
.footer-links a {
  text-decoration: none;
  color: #202020;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}
.footer-links a:hover,
.footer-copyright a:hover,
.footer-record a:hover {
  color: #0085b6;
}
.friend-link-img {
  height: 24px;
  width: auto;
  display: block;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.friend-link-img.is-fading {
  opacity: 0;
}
.footer-record {
  margin-top: 15px;
}
.footer-record p,
.footer-record a {
  margin: 0;
  font-size: 0.85rem;
  color: #202020;
  text-decoration: none;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .footer-left {
    align-items: center;
  }
  .footer-right {
    text-align: center;
  }
  .footer-links {
    justify-content: center;
  }
  .footer-links-title {
    text-align: center;
  }
  .footer-copyright {
    text-align: center;
  }
  .footer-image {
    display: none;
  }
}
</style>
