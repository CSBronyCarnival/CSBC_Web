<script setup>
useHead({ title: 'CSBC华南马聚2026 - 场地交通和订房相关' })
</script>

<template>
  <div class="nav-page">
    <VenueHero src="/img/venue/full.webp" :alt="$t('navPage.hotel')"
      :title="$t('navPage.hero')"
      :subtitle="$t('navPage.heroSub')"
      icon='<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>' />

    <!-- Hotel Info -->
    <section class="nav-venue-section">
      <div class="nav-venue-container">
        <div class="nav-venue-header">
          <h2>{{ $t('navPage.hotel') }}</h2>
          <p class="nav-venue-subtitle">{{ $t('navPage.hotelSub') }}</p>
          <div class="nav-venue-address">
            <p>{{ $t('navPage.address') }}</p>
          </div>
          <div class="nav-venue-description">
            <p>{{ $t('navPage.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Room Features -->
    <section class="venue-features-section">
      <div class="venue-features-container">
        <VenueFeatureCard
          img-src="/img/venue/1.webp"
          :subtitle="$t('navPage.card1.subtitle')"
          :title="$t('navPage.card1.title')"
          :description="$t('navPage.card1.desc')"
          button-href="https://item.taobao.com/item.htm?ft=t&id=1011988599464"
          :button-text="$t('navPage.card1.btn')"
        />
        <VenueFeatureCard
          img-src="/img/venue/2.webp"
          :subtitle="$t('navPage.card2.subtitle')"
          :title="$t('navPage.card2.title')"
          :description="$t('navPage.card2.desc')"
          button-href="https://item.taobao.com/item.htm?ft=t&id=1013484277299"
          :button-text="$t('navPage.card2.btn')"
        />
        <VenueFeatureCard
          img-src="/img/venue/3.webp"
          :subtitle="$t('navPage.card3.subtitle')"
          :title="$t('navPage.card3.title')"
          :description="$t('navPage.card3.desc')"
          button-href="/"
          :button-text="$t('navPage.card3.btn')"
        />
      </div>
    </section>

    <AppTransportation />

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
