<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: computed(() => t('pageTitle.ticket')) })

const cards = computed(() => [
  {
    title: t('ticket.card1.title'),
    unit: t('ticket.card1.unit'),
    features: [t('ticket.card1.feature1'), t('ticket.card1.feature2'), t('ticket.card1.feature3')].filter(Boolean),
    btn: t('ticket.card1.btn'),
    href: 'https://item.taobao.com/item.htm?ft=t&id=1011981103289'
  },
  {
    title: t('ticket.card2.title'),
    subtitle: t('ticket.card2.subtitle'),
    unit: t('ticket.card2.unit'),
    features: [t('ticket.card2.feature1'), t('ticket.card2.feature2'), t('ticket.card2.feature3'), t('ticket.card2.feature4')].filter(Boolean),
    btn: t('ticket.card2.btn'),
    href: 'https://item.taobao.com/item.htm?ft=t&id=1014238524305',
    featured: true
  },
  {
    title: t('ticket.card3.title'),
    unit: t('ticket.card3.unit'),
    features: [t('ticket.card3.feature1'), t('ticket.card3.feature2'), t('ticket.card3.feature3')].filter(Boolean),
    btn: t('ticket.card3.btn'),
    href: 'https://item.taobao.com/item.htm?ft=t&id=1011982387024'
  }
])
</script>

<template>
  <div class="ticket-page">
    <SubpageHero :title="$t('ticket.hero')" :subtitle="$t('ticket.heroSub')" icon="/img/page/ticket.svg" />

    <section class="pricing-section" id="ticket">
      <div class="container">
        <div class="pricing-content">
          <PricingCard
            v-for="(card, i) in cards"
            :key="i"
            :title="card.title"
            :subtitle="card.subtitle"
            :price="card.featured ? '¥1999' : i === 0 ? '¥188' : '¥888'"
            :unit="card.unit"
            :features="card.features"
            :button-href="card.href"
            :button-text="card.btn"
            :featured="card.featured"
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

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
