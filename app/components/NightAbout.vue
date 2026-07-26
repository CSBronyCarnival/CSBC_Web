<template>
  <section class="about-section">
    <div class="container">
      <div class="about-row">
        <div class="about-img">
          <img src="/img/night/about.webp" alt="夜下扬蹄" />
          <p class="credit">摄影：Ryazen</p>
        </div>
        <div class="about-text">
          <h3>夜下扬蹄</h3>
          <p>
            我们追求梦想中的小马音乐现场，志在成为亚洲地区最为专门化的小马音乐会。<br />
            来自五湖四海的小马音乐人相聚一堂，他们用音乐创造了一个又一个难忘的夜晚。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 100px 0;
  background: #1e1e1e;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.about-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}
.about-img {
  flex: 0 0 45%;
  overflow: hidden;
  margin-left: 40px;
}
.about-img img {
  width: 100%;
  border-radius: 8px;
  display: block;
}
.credit {
  font-size: 12px;
  color: #6b6b6b;
  margin-top: 10px;
}
.about-text {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #b0b0b0;
}
.about-text h3 {
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}
.about-text p {
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 0;
  }
  .about-row {
    flex-direction: column;
    gap: 30px;
  }
  .about-img {
    flex: 0 0 100%;
    margin-left: 0;
  }
  .about-text {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
