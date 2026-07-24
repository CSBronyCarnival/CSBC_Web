<template>
  <div class="qa-item" :class="{ active }" @click="$emit('toggle')">
    <div class="qa-question">
      <h3>{{ question }}</h3>
      <span class="qa-toggle">+</span>
    </div>
    <div class="qa-answer">
      <p v-html="answer"></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  active: { type: Boolean, default: false }
})

defineEmits(['toggle'])
</script>

<style scoped>
.qa-item {
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}
.qa-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.qa-question h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}
.qa-toggle {
  font-size: 1.5rem;
  color: #3498db;
  transition: transform 0.3s ease;
}
.qa-item.active .qa-toggle {
  transform: rotate(45deg);
}
.qa-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 20px;
}
.qa-item.active .qa-answer {
  max-height: 300px;
  padding: 0 20px 20px;
}
.qa-answer p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}
</style>
