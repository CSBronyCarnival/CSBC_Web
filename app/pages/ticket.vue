<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: 'CSBC华南马聚2026 - 票价' })

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
    <SubpageHero :title="$t('ticket.hero')" :subtitle="$t('ticket.heroSub')" icon='<path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>' />

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
