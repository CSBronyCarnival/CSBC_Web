<template>
  <div class="pricing-tier" :class="{ featured }">
    <h3>{{ title }}</h3>
    <h4 v-if="subtitle">{{ subtitle }}</h4>
    <div class="price">{{ price }}<span>{{ unit }}</span></div>
    <ul>
      <li v-for="(item, i) in features" :key="i">{{ item }}</li>
    </ul>
    <BaseButton :href="buttonHref" variant="pricing">{{ buttonText }}</BaseButton>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  price: { type: String, required: true },
  unit: { type: String, default: '' },
  features: { type: Array, required: true },
  buttonHref: { type: String, required: true },
  buttonText: { type: String, default: '立即购买' },
  featured: { type: Boolean, default: false }
})
</script>

<style scoped>
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

.pricing-tier :deep(.click-tilt),
.pricing-tier :deep(.btn-pricing) {
  width: 100%;
}
</style>
