<template>
  <main class="error-page">
    {{ errorCode }}
  </main>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

const errorCode = computed(() => props.error?.statusCode ?? 500)
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
</style>
