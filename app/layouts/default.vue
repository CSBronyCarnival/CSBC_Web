<template>
  <div>
    <AppNav />
    <slot />
    <AppFooter :key="$route.path" />
    <CornerPony />
  </div>
</template>

<script setup>
const route = useRoute()
const isNight = computed(() => route.path.startsWith('/night'))

useHead({
  bodyAttrs: computed(() => ({
    class: isNight.value ? 'night' : ''
  }))
})
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
</style>
