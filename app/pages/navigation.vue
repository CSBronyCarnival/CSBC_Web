<template>
  <div class="nav-page">
    <SubpageHero title="场地交通和订房相关" subtitle="Navigation" />

    <!-- Hotel Info -->
    <section class="nav-venue-section">
      <div class="nav-venue-container">
        <div class="nav-venue-header">
          <h2>广州瑞士酒店</h2>
          <p class="nav-venue-subtitle">Swissôtel Guangzhou</p>
          <div class="nav-venue-address">
            <p>地址：广州市天河区华观路1961号</p>
          </div>
          <div class="nav-venue-description">
            <p>广州瑞士酒店位于广州市天河区东北部天河智慧城（IBD）的核心区--天河软件园内。酒店共拥有364间具有现代东方格调的客房及套房。酒店拥有3个风格各异的餐厅为宾客带来多元化的美食体验此外，酒店还配有户外泳池，功能齐全、设施完备的健身中心，15000平方米的户外花园为宾客打造活力惬意的度假时光。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Room Features -->
    <section class="venue-features-section">
      <div class="venue-features-container">
        <VenueFeatureCard
          img-src="/img/venue/1.webp"
          subtitle="房间内景1"
          title="经典大床房"
          description="温馨大床 设施齐全 舒适入住体验"
          button-href="https://item.taobao.com/item.htm?ft=t&id=1011988599464"
          button-text="立即订房"
        />
        <VenueFeatureCard
          img-src="/img/venue/2.webp"
          subtitle="房间内景2"
          title="经典双床房"
          description="床位加倍 价格不变 尽享优质睡眠"
          button-href="https://item.taobao.com/item.htm?ft=t&id=1013484277299"
          button-text="立即订房"
        />
        <VenueFeatureCard
          img-src="/img/venue/3.webp"
          subtitle="场地内景"
          title="马展场地内景"
          description="千平会场 7.5米挑高 舒适宽敞"
          button-href="/"
          button-text="了解更多"
        />
      </div>
    </section>

    <AppTransportation />

    <AppFooter />
  </div>
</template>

<style scoped>
/* ===== Venue Hotel Info ===== */
.nav-venue-section {
  padding: 80px 0;
}
.nav-venue-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.nav-venue-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.nav-venue-header h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}
.nav-venue-subtitle {
  font-size: 1.2rem;
  color: #7c7c7c;
  margin-bottom: 30px;
  font-weight: 500;
  font-style: italic;
}
.nav-venue-address {
  margin-bottom: 30px;
  padding: 20px;
}
.nav-venue-address p {
  font-size: 1.2rem;
  color: #444;
  margin: 0;
}
.nav-venue-description {
  padding: 30px;
  text-align: left;
}
.nav-venue-description p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

/* ===== Room Features ===== */
.venue-features-section {
  background-color: #ffffff;
  margin-bottom: 80px;
}
.venue-features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}


/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-venue-section {
    padding: 50px 0;
  }
  .nav-venue-header h2 {
    font-size: 2rem;
  }
  .nav-venue-description {
    padding: 20px;
  }
  .nav-venue-description p {
    font-size: 1rem;
  }
  .venue-features-section {
    padding: 50px 0;
  }
  .venue-features-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

}
</style>
