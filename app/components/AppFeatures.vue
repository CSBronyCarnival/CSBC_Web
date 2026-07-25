<template>
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
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
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

@media (max-width: 768px) {
  .features-header h2 {
    font-size: 2rem;
  }
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
