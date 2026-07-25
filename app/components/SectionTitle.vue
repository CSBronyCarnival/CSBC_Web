<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="section-divider">
      <span class="divider-line"></span>
      <span class="divider-dot"></span>
      <span class="divider-line"></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
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

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
  }
}
</style>
