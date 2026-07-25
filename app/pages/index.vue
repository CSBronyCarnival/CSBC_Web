<template>
  <div class="home">
    <AppHero />
    <AppFeatures />

    <!-- About -->
    <section class="about-section" id="about">
      <div class="container">
        <h2>关于</h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
        <AppAbout />
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
        <AppVenue />
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
          <PricingCard
            title="单人通票"
            price="¥188"
            unit="/人"
            :features="['18-19日无限制进场', '包含夜场活动', '标准众筹回馈']"
            button-href="https://item.taobao.com/item.htm?ft=t&id=1011981103289"
          />
          <PricingCard
            title="酒店套票"
            subtitle="仅限40套"
            price="¥1999"
            unit="/人"
            :features="['单人通票权益', '特殊回馈', '3晚瑞士酒店经典房（含早餐）']"
            button-href="https://item.taobao.com/item.htm?ft=t&id=1014238524305"
            featured
          />
          <PricingCard
            title="SUPPORTER"
            price="¥888"
            unit="/人"
            :features="['单人通票权益', '特殊回馈', '场刊致谢']"
            button-href="https://item.taobao.com/item.htm?ft=t&id=1011982387024"
          />
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
          <TeamMember name="光翼" avatar="/img/team/光翼.webp" description="主办" />
          <TeamMember name="Ladetaw" avatar="/img/team/Ladetaw.webp" description="主办" />
          <TeamMember name="Stevenife" avatar="/img/team/Stevenife.webp" description="Office.exe" />
          <TeamMember name="牛奶" avatar="/img/team/牛奶.webp" description="画师" />
          <TeamMember name="灵翼" avatar="/img/team/灵翼.webp" description="潜行中" />
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
            <FAQItem
              question="18/19号的活动有差异吗？"
              answer="今年的展会回归2天模式<br>展会将于2026年7月18日至19日在广州瑞士酒店举行<br>两天的活动均不相同"
            />
            <FAQItem
              question="如何领取众筹回馈？"
              answer="我们的众筹回馈于展会现场发放<br>届时您可向检票人员出示淘宝订单页面<br>并领取您的门票和众筹回馈"
            />
            <FAQItem
              question="在非展会举行期间如果需要加房怎么办？"
              answer="请在群内联系管理员进行登记 我们会为您处理相关事宜"
            />
          </div>
          <div class="qa-column">
            <FAQItem
              question="展会有单独的官方酒店可以定吗？"
              answer="在&quot;CSBC华南马聚&quot;淘宝店的主页找到广州瑞士酒店房间的预定<br>选择房型并下单 并备注您入住的日期<br>如不会操作欢迎在群内问询"
            />
            <FAQItem
              question="展会的票数量有限制吗?"
              answer="暂定所有票的综合为500张<br>其中酒店套票仅限40张 售完即止<br>详情请关注淘宝店"
            />
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
    <SideNav />
  </div>
</template>

<style scoped>
/* ===== Container ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .about-section h2,
  .venue-section h2,
  .pricing-section h2,
  .team-section h2,
  .qa-section h2 {
    font-size: 2rem;
  }
  .qa-content {
    flex-direction: column;
  }
  .qa-column {
    max-width: 100%;
  }
}
</style>
