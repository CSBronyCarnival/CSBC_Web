<template>
  <div class="contact-page">
    <SubpageHero title="联系我们" subtitle="Contact Us" icon='<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' />

    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-item">
            <div class="contact-icon">
              <img src="/img/link/qq.svg" alt="QQ群">
            </div>
            <h3>QQ群</h3>
            <p>查看展会实时动态</p>
            <BaseButton href="https://qm.qq.com/q/kP0n8Mng9G" variant="section">加入QQ群</BaseButton>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <img src="/img/link/bili.svg" alt="Bilibili">
            </div>
            <h3>Bilibili</h3>
            <p>展会相关信息与录播</p>
            <BaseButton href="https://space.bilibili.com/371768934" variant="section">点击查看</BaseButton>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <img src="/img/link/discord.svg" alt="Discord">
            </div>
            <h3>Discord</h3>
            <p>查看展会实时动态</p>
            <BaseButton href="https://discord.com/invite/mbNkveehRB" variant="section">加入服务器</BaseButton>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== Contact Section ===== */
.contact-section {
  padding: 80px 0;
}
.contact-content {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}
.contact-item {
  flex: 1;
  min-width: 250px;
  max-width: 320px;
  text-align: center;
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #e2f1ff;
  border-radius: 50%;
  padding: 14px;
}
.contact-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.contact-item h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 8px;
}
.contact-item p {
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

/* 按钮统一样式覆盖 */
.contact-item :deep(.btn-section) {
  margin-top: auto;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 60px 0;
  }
  .contact-content {
    gap: 24px;
  }
  .contact-item {
    max-width: 100%;
  }
}
</style>
