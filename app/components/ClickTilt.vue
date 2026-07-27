<template>
  <div
    ref="el"
    class="click-tilt"
    :class="{ 'is-springing': springing }"
    :style="tx"
    @mousedown="onDown"
    @mouseup="onUp"
    @mouseleave="onUp"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const el = ref<HTMLElement>()
const rx = ref(0)
const ry = ref(0)
const sc = ref(1)
const pressed = ref(false)
const springing = ref(false)

const tx = computed(() => ({
  transform:
    `perspective(800px) ` +
    `rotateX(${rx.value}deg) rotateY(${ry.value}deg) ` +
    `translateZ(${pressed.value ? '-3px' : '0px'}) ` +
    `scale(${sc.value})`,
}))

function onDown(e: MouseEvent) {
  const dom = el.value
  if (!dom) return
  const r = dom.getBoundingClientRect()
  const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
  const dy = ((e.clientY - r.top) / r.height - 0.5) * 2

  springing.value = false
  rx.value = -dy * 8
  ry.value = dx * 8
  sc.value = 0.97
  pressed.value = true
}

function onUp() {
  if (!pressed.value) return
  springing.value = true
  rx.value = 0
  ry.value = 0
  sc.value = 1
  pressed.value = false
}
</script>

<style scoped>
.click-tilt {
  display: inline-flex;
  transform-style: preserve-3d;
  will-change: transform;
}

.click-tilt.is-springing {
  transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1);
}
</style>
