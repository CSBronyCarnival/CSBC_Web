<template>
  <div class="ticket-page">
    <SubpageHero title="票价" subtitle="Ticket" />

    <!-- Pricing -->
    <section class="pricing-section" id="ticket">
      <div class="container">
        <SectionTitle title="票价" />
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

  </div>
</template>

<style scoped>
.ticket-page {
  min-height: 100vh;
}

/* ===== Container ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== Pricing ===== */
.pricing-section {
  padding: 100px 0;
}
.pricing-content {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
