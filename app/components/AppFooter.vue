<template>
  <footer class="footer">
    <div class="footer-image">
      <img ref="footerImgRef" src="/img/csbc-line-w.svg">
    </div>
    <div class="footer-container">
      <div class="footer-left">
        <div class="footer-logo">
          <a href="/"><img src="/img/logo.png"></a>
        </div>
        <div class="footer-social">
          <a href="https://space.bilibili.com/371768934" target="_blank" class="social-link"><img src="/img/link/bili.svg" alt="Bilibili"></a>
          <a href="https://qm.qq.com/q/kP0n8Mng9G" target="_blank" class="social-link"><img src="/img/link/qq.svg" alt="QQ"></a>
          <a href="https://x.com/csbronycarnival" target="_blank" class="social-link"><img src="/img/link/x.svg" alt="X"></a>
          <a href="https://www.youtube.com/@lywings1" target="_blank" class="social-link"><img src="/img/link/youtube.svg" alt="YouTube"></a>
          <a href="https://discord.com/invite/mbNkveehRB" target="_blank" class="social-link"><img src="/img/link/discord.svg" alt="Discord"></a>
          <a href="https://github.com/CSBronyCarnival" target="_blank" class="social-link"><img src="/img/link/github.svg" alt="GitHub"></a>
          <a href="https://gitee.com/CSBronyCarnival" target="_blank" class="social-link"><img src="/img/link/gitee.svg" alt="Gitee"></a>
        </div>
        <div class="footer-copyright">
          <p><a href="https://github.com/CSBronyCarnival/CSBC_Web">&copy; 2022-2025 CSBronyCarnival</a><br>该网站的源代码已使用 MIT 许可证开放</p>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-links-title"><p>友情链接</p></div>
        <ul class="footer-links">
          <li><a target="_blank" href="https://malangpony.com/"><img src="/img/link/exchange/malang_b.png" class="friend-link-img" data-hover-src="/img/link/exchange/malang.png"></a></li>
          <li><a target="_blank" href="https://brony.scot/"><img src="/img/link/exchange/bs_b.png" class="friend-link-img" data-hover-src="/img/link/exchange/bs.png"></a></li>
          <li><a target="_blank" href="https://www.norsehorsecon.eu/"><img src="/img/link/exchange/norse_b.webp" class="friend-link-img" data-hover-src="/img/link/exchange/norse.webp"></a></li>
          <li><a target="_blank" href="https://galacon.eu/"><img src="/img/link/exchange/gala_b.webp" class="friend-link-img" data-hover-src="/img/link/exchange/gala.webp"></a></li>
          <li><a target="_blank" href="http://suncelebration.butterpony.com/"><img src="/img/link/exchange/ssc_b.webp" class="friend-link-img" data-hover-src="/img/link/exchange/ssc.webp"></a></li>
          <li><a target="_blank" href="https://x.com/Poniko_MLP/"><img src="/img/link/exchange/ponikon_b.webp" class="friend-link-img" data-hover-src="/img/link/exchange/ponikon.webp"></a></li>
          <li><a target="_blank" href="https://sunshine.horse/"><img src="/img/link/exchange/spc_b.webp" class="friend-link-img" data-hover-src="/img/link/exchange/spc.webp"></a></li>
          <li><a target="_blank" href="https://derpfest.ru/"><img src="/img/link/exchange/derpfest_b.svg" class="friend-link-img" data-hover-src="/img/link/exchange/derpfest.svg"></a></li>
          <li><a target="_blank" href="https://twbronycon.org/"><img src="/img/link/exchange/twbc_b.png" class="friend-link-img" data-hover-src="/img/link/exchange/twbc.png"></a></li>
          <li><a target="_blank" href="https://dreamlandcon.top/"><img src="/img/link/exchange/dlc_b.svg" class="friend-link-img" data-hover-src="/img/link/exchange/dlc.svg"></a></li>
          <li><a target="_blank" href="https://www.equestriacn.com/"><img src="/img/link/exchange/eqcn_b.png" class="friend-link-img" data-hover-src="/img/link/exchange/eqcn.png"></a></li>
        </ul>
        <div class="footer-record">
          <p><a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2024035737号</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const footerImgRef = ref(null)

// 页脚装饰图鼠标景深
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

  // 友链 logo 悬浮切换彩色
  document.querySelectorAll('.friend-link-img').forEach(img => {
    const originalSrc = img.src
    const hoverSrc = img.getAttribute('data-hover-src')
    if (!hoverSrc || hoverSrc === originalSrc) return

    const preload = new Image()
    preload.src = hoverSrc

    img.addEventListener('mouseenter', () => {
      img.style.transition = 'opacity 0.3s ease'
      img.style.opacity = '0'
      setTimeout(() => {
        img.src = hoverSrc
        img.style.opacity = '1'
      }, 150)
    })

    img.addEventListener('mouseleave', () => {
      img.style.opacity = '0'
      setTimeout(() => {
        img.src = originalSrc
        img.style.opacity = '0.7'
      }, 150)
    })
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleFooterMove)
})
</script>

<style scoped>
.footer {
  background: #e2f1ff;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
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
}
</style>
