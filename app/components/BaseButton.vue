<template>
  <NuxtLink v-if="to" :to="to" :class="['btn', `btn-${variant}`]">
    <slot />
  </NuxtLink>
  <a v-else :href="href" :class="['btn', `btn-${variant}`]" :target="isExternal(href) ? '_blank' : undefined">
    <slot />
  </a>
</template>

<script setup>
defineProps({
  href: { type: String, default: '#' },
  to: { type: String, default: '' },
  variant: { type: String, default: 'section' } // hero | section | pricing
})

const isExternal = (href) => href?.startsWith('http')
</script>

<style scoped>
.btn {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 10px;
}

/* Hero 按钮 */
.btn-hero {
  padding: 12px 30px;
  border: 4px solid #fff;
  color: #fff;
  font-size: 1.1rem;
  border-radius: 50px;
}
.btn-hero:hover {
  background: #fff;
  color: #000;
}

/* Section 按钮 */
.btn-section {
  color: #fff;
  background: #4fa7ff;
  padding: 12px 25px;
  border-radius: 10px;
  font-size: 1rem;
}
.btn-section:hover {
  color: #5c5c5c;
  background: #c4c4c43a;
}

/* Pricing 按钮 */
.btn-pricing {
  color: #fff;
  background: #4fa7ff;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 1rem;
  margin-top: auto;
  font-weight: bold;
  display: inline-block;
}
.btn-pricing:hover {
  color: #5c5c5c;
  background: #c4c4c43a;
}
</style>
