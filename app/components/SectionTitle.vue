<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
h2 {
  text-align: left;
  font-size: clamp(2.75rem, 5vw, 4.5rem);
  line-height: 1.08;
  font-weight: 600;
  margin-bottom: 48px;
  color: #2c3e50;
}
@media (max-width: 768px) {
  h2 {
    font-size: 2.6rem;
  }
}
</style>
