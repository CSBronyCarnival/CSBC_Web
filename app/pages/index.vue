<template>
  <div class="home">
    <!-- Hero -->
    <header class="hero" id="home">
      <div class="hero-bg">
        <img src="/img/hero-bg.jpg" alt="">
      </div>
      <div class="hero-image">
        <img src="/img/csbc-line-w.svg" alt="">
      </div>
      <div class="hero-content hero-animation">
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
    </header>

    <!-- Features -->
    <section class="features-section">
      <div class="container">
        <div class="features-header">
          <div class="features-subtitle">相遇 即为幸</div>
          <h2>2026 循蹄声 再前行</h2>
          <p class="features-description">
            一个偶然的开始 我们举办了第一场展会<br>
            至今 已过四载<br>
            遇见你 我们荣幸至极
          </p>
        </div>
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon"><img src="/img/features/1.svg"></div>
            <h3>公益化 非盈利</h3>
            <p>非商业化运营 最纯粹的马展体验</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><img src="/img/features/2.svg"></div>
            <h3>多元性</h3>
            <p>山海自有归期 友谊在此相逢</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><img src="/img/features/3.svg"></div>
            <h3>互动性</h3>
            <p>更多的交互 更沉浸的体验</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><img src="/img/features/4.svg"></div>
            <h3>多层次</h3>
            <p>不局限于正剧 更有同人及二创内容</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="about-section" id="about">
      <div class="container">
        <h2>关于</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <div class="about-content-wrapper">
          <div class="about-text">
            <h3>华南马聚CSBC</h3>
            <div class="title-underline"></div>
            <p>思考 创新 进步</p>
            <p>
              我们是华南马聚CSBC 始于广州 2022年以来已在华南地区成功举办多场展会<br>
              我们致力于与各位马迷朋友们共同思考 共同创新
              在发展的过程中与各位一同进步 为各位带来更加良好的参展体验
            </p>
            <BaseButton href="contact.html" variant="section">联系我们</BaseButton>
          </div>
          <div class="about-image">
            <img src="/img/about.webp">
          </div>
        </div>
      </div>
    </section>

    <!-- Venue -->
    <section class="venue-section" id="venue">
      <div class="container">
        <h2>场地</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <div class="venue-content">
          <div class="venue-image">
            <img src="/img/venue/main.webp">
          </div>
          <div class="venue-description">
            <h3>广州瑞士酒店 <span>Swissôtel Guangzhou</span></h3>
            <div class="title-underline"></div>
            <h4>地址：广州市天河区华观路1961号</h4>
            <p>
              广州瑞士酒店位于广州市天河区东北部天河智慧城（IBD）的核心区--天河软件园内。
              酒店共拥有364间具有现代东方格调的客房及套房。
              酒店拥有3个风格各异的餐厅为宾客带来多元化的美食体验。此外，酒店还配有户外泳池，
              功能齐全、设施完备的健身中心，15000平方米的户外花园为宾客打造活力惬意的度假时光。
              时间与旅行是生活的美妙馈赠，希望入住的您也能感受到来自瑞士的健康活力与高品质生活体验。
            </p>
            <BaseButton href="navigation.html" variant="section">了解详情/订购房间</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="pricing-section" id="ticket">
      <div class="container">
        <h2>票价</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <div class="pricing-content">
          <div class="pricing-tier">
            <h3>单人通票</h3>
            <div class="price">¥188<span>/人</span></div>
            <ul>
              <li>18-19日无限制进场</li>
              <li>包含夜场活动</li>
              <li>标准众筹回馈</li>
            </ul>
            <BaseButton href="https://item.taobao.com/item.htm?ft=t&id=1011981103289" variant="pricing">立即购买</BaseButton>
          </div>
          <div class="pricing-tier featured">
            <h3>酒店套票</h3>
            <h4>仅限40套</h4>
            <div class="price">¥1999<span>/人</span></div>
            <ul>
              <li>单人通票权益</li>
              <li>特殊回馈</li>
              <li>3晚瑞士酒店经典房（含早餐）</li>
            </ul>
            <BaseButton href="https://item.taobao.com/item.htm?ft=t&id=1014238524305" variant="pricing">立即购买</BaseButton>
          </div>
          <div class="pricing-tier">
            <h3>SUPPORTER</h3>
            <div class="price">¥888<span>/人</span></div>
            <ul>
              <li>单人通票权益</li>
              <li>特殊回馈</li>
              <li>场刊致谢</li>
            </ul>
            <BaseButton href="https://item.taobao.com/item.htm?ft=t&id=1011982387024" variant="pricing">立即购买</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section" id="team">
      <div class="container">
        <h2>团队</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <div class="team-content">
          <div class="team-member">
            <div class="member-avatar"><img src="/img/team/光翼.webp"></div>
            <h3>光翼</h3>
            <p class="member-description">主办</p>
          </div>
          <div class="team-member">
            <div class="member-avatar"><img src="/img/team/Ladetaw.webp"></div>
            <h3>Ladetaw</h3>
            <p class="member-description">主办</p>
          </div>
          <div class="team-member">
            <div class="member-avatar"><img src="/img/team/Stevenife.webp"></div>
            <h3>Stevenife</h3>
            <p class="member-description">Office.exe</p>
          </div>
          <div class="team-member">
            <div class="member-avatar"><img src="/img/team/牛奶.webp"></div>
            <h3>牛奶</h3>
            <p class="member-description">画师</p>
          </div>
          <div class="team-member">
            <div class="member-avatar"><img src="/img/team/灵翼.webp"></div>
            <h3>灵翼</h3>
            <p class="member-description">潜行中</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="qa-section" id="qa">
      <div class="container">
        <h2>常见问题</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <div class="qa-content">
          <div class="qa-column">
            <div class="qa-item" :class="{ active: activeQA === 0 }" @click="toggleQA(0)">
              <div class="qa-question">
                <h3>18/19号的活动有差异吗？</h3>
                <span class="qa-toggle">+</span>
              </div>
              <div class="qa-answer">
                <p>今年的展会回归2天模式<br>展会将于2026年7月18日至19日在广州瑞士酒店举行<br>两天的活动均不相同</p>
              </div>
            </div>
            <div class="qa-item" :class="{ active: activeQA === 1 }" @click="toggleQA(1)">
              <div class="qa-question">
                <h3>如何领取众筹回馈？</h3>
                <span class="qa-toggle">+</span>
              </div>
              <div class="qa-answer">
                <p>我们的众筹回馈于展会现场发放<br>届时您可向检票人员出示淘宝订单页面<br>并领取您的门票和众筹回馈</p>
              </div>
            </div>
            <div class="qa-item" :class="{ active: activeQA === 2 }" @click="toggleQA(2)">
              <div class="qa-question">
                <h3>在非展会举行期间如果需要加房怎么办？</h3>
                <span class="qa-toggle">+</span>
              </div>
              <div class="qa-answer">
                <p>请在群内联系管理员进行登记 我们会为您处理相关事宜</p>
              </div>
            </div>
          </div>
          <div class="qa-column">
            <div class="qa-item" :class="{ active: activeQA === 3 }" @click="toggleQA(3)">
              <div class="qa-question">
                <h3>展会有单独的官方酒店可以定吗？</h3>
                <span class="qa-toggle">+</span>
              </div>
              <div class="qa-answer">
                <p>在"CSBC华南马聚"淘宝店的主页找到广州瑞士酒店房间的预定<br>选择房型并下单 并备注您入住的日期<br>如不会操作欢迎在群内问询</p>
              </div>
            </div>
            <div class="qa-item" :class="{ active: activeQA === 4 }" @click="toggleQA(4)">
              <div class="qa-question">
                <h3>展会的票数量有限制吗?</h3>
                <span class="qa-toggle">+</span>
              </div>
              <div class="qa-answer">
                <p>暂定所有票的综合为500张<br>其中酒店套票仅限40张 售完即止<br>详情请关注淘宝店</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
    <SideNav :active-section="activeSection" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeQA = ref(-1)
const activeSection = ref('home')

// 鼠标景深效果
function handleMouseMove(e) {
  const isMobile = window.innerWidth < 768
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  const heroBg = document.querySelector('.hero-bg img')
  if (heroBg) {
    if (isMobile) {
      heroBg.style.transform = 'translate(-5%, -5%)'
    } else {
      const bgIntensity = 15
      heroBg.style.transform = `translate(calc(-5% + ${(mouseX - 0.5) * bgIntensity}px), calc(-5% + ${(mouseY - 0.5) * bgIntensity}px))`
    }
  }

  const heroImage = document.querySelector('.hero-image')
  if (heroImage) {
    if (isMobile) {
      heroImage.style.transform = 'translate(-50%, -50%)'
    } else {
      const imgIntensity = 25
      heroImage.style.transform = `translate(calc(-50% + ${(mouseX - 0.5) * imgIntensity}px), calc(-50% + ${(mouseY - 0.5) * imgIntensity}px))`
    }
  }

  const heroContent = document.querySelector('.hero-content')
  if (heroContent) {
    if (isMobile) {
      heroContent.style.transform = 'translate(0, 0)'
    } else {
      const titleIntensity = 30
      heroContent.style.transform = `translate(${(mouseX - 0.5) * titleIntensity}px, ${(mouseY - 0.5) * titleIntensity}px)`
    }
  }

  const footerImage = document.querySelector('.footer-image img')
  if (footerImage) {
    if (isMobile) {
      footerImage.style.transform = 'translateY(30%)'
    } else {
      const footerIntensity = 15
      footerImage.style.transform = `translateY(30%) translate(${(mouseX - 0.5) * footerIntensity}px, ${(mouseY - 0.5) * footerIntensity}px)`
    }
  }

  const heroImgEl = document.querySelector('.hero-image img')
  if (heroImgEl && !isMobile) {
    const rect = heroImgEl.getBoundingClientRect()
    heroImgEl.style.setProperty('--x', `${e.clientX - rect.left}px`)
    heroImgEl.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  // 滚动监听高亮当前section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })
  ;['home', 'venue', 'ticket', 'qa', 'team'].forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})

function toggleQA(index) {
  activeQA.value = activeQA.value === index ? -1 : index
}
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
  filter: brightness(0.7);
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
  opacity: 0.85;
  filter: brightness(1.2) drop-shadow(0 0 20px rgba(0,0,0,0.5));
  -webkit-mask-image: radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black 20%, rgba(0,0,0,0.25) 100%);
  mask-image: radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black 20%, rgba(0,0,0,0.25) 100%);
}
.hero-content {
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
  will-change: transform;
  transition: transform 0.12s ease-out;
}
.hero-animation {
  animation: titleAnimation 2s cubic-bezier(0.00, 0.00, 0.00, 1.00) forwards;
}
@keyframes titleAnimation {
  0% { opacity: 0; }
  15% { opacity: 0; }
  100% { opacity: 1; }
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

/* ===== Container ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== Features ===== */
.features-section {
  padding: 40px 0;
}
.features-header {
  text-align: left;
  margin-bottom: 60px;
}
.features-subtitle {
  font-size: 1.1rem;
  color: #4fa7ff;
  margin-bottom: 5px;
  font-weight: 600;
}
.features-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 5px;
  font-weight: 700;
}
.features-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
}
.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
.feature-item {
  padding: 20px;
  text-align: center;
}
.feature-icon {
  width: 80px; height: 80px;
  background: #e6f4ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
}
.feature-icon img {
  width: 40px;
  height: auto;
}
.feature-item h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}
.feature-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* ===== Section Divider ===== */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  margin-top: -25px;
  width: 200px;
}
.divider-line {
  flex-grow: 1;
  height: 1px;
  background: #dfdfdf;
}
.divider-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #c7c7c7;
  margin: 0 10px;
}

/* ===== About ===== */
.about-section {
  padding: 100px 0;
}
.about-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.about-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}
.about-text h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}
.title-underline {
  width: 180px;
  height: 1px;
  background: #dfdfdf;
  margin-bottom: 20px;
}
.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 25px;
  text-align: left;
}
.about-image {
  flex: 0 0 auto;
  width: 500px;
}
.about-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

/* ===== Venue ===== */
.venue-section {
  padding: 100px 0;
}
.venue-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.venue-content {
  display: flex;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.venue-image {
  flex: 1;
  max-width: 500px;
}
.venue-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.venue-description {
  flex: 1;
}
.venue-description h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}
.venue-description h3 span {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 400;
  font-style: italic;
}
.venue-description h4 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #696969;
  font-weight: 400;
}
.venue-description p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

/* ===== Pricing ===== */
.pricing-section {
  padding: 100px 0;
}
.pricing-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.pricing-content {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}
.pricing-tier {
  background: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
}
.pricing-tier h3 {
  font-size: 1.5rem;
  color: #2c3e50;
}
.pricing-tier h4 {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}
.price {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 20px;
}
.price span {
  font-size: 1rem;
  font-weight: normal;
  color: #7f8c8d;
  margin-left: 5px;
}
.pricing-tier ul {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
  flex-grow: 1;
}
.pricing-tier ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  color: #555;
}
.pricing-tier ul li:last-child {
  border-bottom: none;
}
.pricing-tier.featured {
  background: #3498db;
  color: white;
  transform: scale(1.05);
  position: relative;
  overflow: hidden;
}
.pricing-tier.featured::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('/img/ticket-bg.svg') no-repeat 80% center;
  background-size: 190%;
  opacity: 0.1;
}
.pricing-tier.featured > * {
  position: relative;
  z-index: 1;
}
.pricing-tier.featured h3,
.pricing-tier.featured h4,
.pricing-tier.featured .price,
.pricing-tier.featured .price span,
.pricing-tier.featured ul li {
  color: white;
  border-bottom-color: rgba(255,255,255,0.2);
}
.pricing-tier.featured :deep(.btn-pricing) {
  background: white;
  color: #3498db;
}

/* ===== Team ===== */
.team-section {
  padding: 100px 0;
  background: white;
}
.team-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.team-content {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}
.team-member {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  flex: 1;
  min-width: 200px;
  max-width: 220px;
}
.member-avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
}
.member-avatar img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.team-member h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #2c3e50;
}
.member-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
}

/* ===== FAQ ===== */
.qa-section {
  padding: 100px 0;
  background: white;
}
.qa-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.qa-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
.qa-column {
  flex: 1;
  max-width: 48%;
}
.qa-item {
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}
.qa-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.qa-question h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}
.qa-toggle {
  font-size: 1.5rem;
  color: #3498db;
  transition: transform 0.3s ease;
}
.qa-item.active .qa-toggle {
  transform: rotate(45deg);
}
.qa-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 20px;
}
.qa-item.active .qa-answer {
  max-height: 300px;
  padding: 0 20px 20px;
}
.qa-answer p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  .hero-content p {
    font-size: 1.1rem;
  }
  .hero-image {
    display: none;
  }
  .hero-bg img {
    object-position: 83% center;
  }
  .features-header h2 {
    font-size: 2rem;
  }
  .features-list {
    grid-template-columns: 1fr;
  }
  .about-section h2,
  .venue-section h2,
  .pricing-section h2,
  .team-section h2,
  .qa-section h2 {
    font-size: 2rem;
  }
  .about-content-wrapper {
    flex-direction: column;
    gap: 20px;
  }
  .about-image {
    width: 250px;
  }
  .venue-content {
    flex-direction: column;
    gap: 30px;
  }
  .venue-image {
    max-width: 100%;
    order: -1;
  }
  .qa-content {
    flex-direction: column;
  }
  .qa-column {
    max-width: 100%;
  }
  .team-member {
    min-width: 180px;
    max-width: 200px;
  }
  .member-avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
