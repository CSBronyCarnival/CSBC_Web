<template>
  <div v-if="isReady" class="corner-pony-widget">
    <div
      id="corner-pony"
      class="corner-pony"
      :class="{ 'is-collapsed': isCollapsed }"
      :inert="isCollapsed"
      :aria-hidden="isCollapsed"
      @click="onClick"
    >
      <img
        ref="imgRef"
        class="pony-img"
        :src="ponyImages[currentIndex]"
        alt="咩咩本尊"
      />

      <Transition name="bubble">
        <div v-if="bubbleVisible" class="pony-bubble">
          {{ bubbleText }}
        </div>
      </Transition>

      <div class="pony-buttons">
        <button
          type="button"
          class="pony-btn switch-btn"
          title="切换外观"
          aria-label="切换外观"
          @click.stop="switchPony"
        >
          <img src="/img/page/switch.svg" alt="" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="pony-btn collapse-btn"
          title="收起吉祥物"
          aria-label="收起吉祥物"
          aria-controls="corner-pony"
          aria-expanded="true"
          @click.stop="collapsePony"
        >
          <img src="/img/page/collapse.svg" alt="" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="pony-expand">
      <button
        v-if="isCollapsed"
        type="button"
        class="pony-btn pony-expand-btn"
        title="展开吉祥物"
        aria-label="展开吉祥物"
        aria-controls="corner-pony"
        aria-expanded="false"
        @click.stop="setCollapsed(false)"
      >
        <img src="/img/page/collapse.svg" alt="" aria-hidden="true" />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ponyImages = [
  '/img/pony/1.webp',
  '/img/pony/2.webp',
  '/img/pony/3.webp',
  '/img/pony/4.webp',
]

const imgRef = ref(null)
const currentIndex = ref(-1)
const isReady = ref(false)
const isCollapsed = ref(false)
const collapsedStorageKey = 'csbc:corner-pony:collapsed'
const bubbleVisible = ref(false)
const bubbleText = ref('')
let bubbleTimer = null
let welcomeTimer = null

const messages = {
  welcome: {
    morning: [
      '早上好！早睡早起是好小马……呃，也是好羊。',
      '上午好呀，我要去看看大家在给马聚做什么样的准备……',
    ],
    afternoon: [
      '午安，困的话就小睡一会儿吧。',
      '午后很容易犯困呢，今天的运动目标完成了吗？',
      '下午总能发现好听的新歌诶。',
    ],
    evening: [
      '晚上好，今天过得怎么样？',
      '记得吃晚饭~！',
    ],
    night: [
      '夜晚是小马们休息的时候，但也是灵感迸发的高发期呢。',
      '很晚啦，快睡吧，露娜会保佑你的。',
    ],
  },
  click: [
    '你问我为什么有两只羊角？咩啊！但是你可以羡慕我，嘿嘿~',
    '华南马聚总有你喜欢的东西，让我来带你玩！',
    '哼，不要随便碰我的衣服，我知道它很酷，这是我大老远跑去瑞瑞那让她设计的呢……',
    '我很喜欢音乐，不管是民间小马创作的歌曲，还是谐律元素们传唱的歌曲，都超棒的！',
    '夏天的羊城好热啊，不过和小马们在一起的时光总是开心的。',
    '想和我面对面交流吗，7.18~19在羊城等你！',
    '*Boop*',
    '我知道我很酷，不过我不介意有小马夸我~（移开视线）',
    '咩',
    '感谢各位对华南马聚的支持，咩咩都看在眼里~',
    '咩啊？',
    'CSBC少不了大家每一只小马的力量，欢迎大家踊跃报名参与各个环节！',
  ],
}

function getTimeType() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function showBubble(text) {
  if (isCollapsed.value) return

  bubbleText.value = text
  bubbleVisible.value = true
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => {
    bubbleVisible.value = false
  }, 3000)
}

function onClick() {
  showBubble(pick(messages.click))
}

function setCollapsed(collapsed) {
  isCollapsed.value = collapsed
  try {
    window.localStorage.setItem(collapsedStorageKey, String(collapsed))
  } catch {
    // 本地存储不可用时，仍可在当前页面正常收起和展开。
  }
}

function collapsePony() {
  setCollapsed(true)
  bubbleVisible.value = false
  clearTimeout(bubbleTimer)
  clearTimeout(welcomeTimer)
}

function switchPony() {
  let next
  do {
    next = Math.floor(Math.random() * ponyImages.length)
  } while (next === currentIndex.value && ponyImages.length > 1)

  const img = imgRef.value
  if (!img) { currentIndex.value = next; return }

  img.style.transition = 'all 0.3s ease'
  img.style.opacity = '0'

  setTimeout(() => {
    currentIndex.value = next
    img.style.opacity = '1'
  }, 300)
}

onMounted(() => {
  try {
    isCollapsed.value = window.localStorage.getItem(collapsedStorageKey) === 'true'
  } catch {
    // 本地存储不可用时，默认展开。
  }
  currentIndex.value = Math.floor(Math.random() * ponyImages.length)
  isReady.value = true
  if (!isCollapsed.value) {
    welcomeTimer = setTimeout(() => {
      showBubble(pick(messages.welcome[getTimeType()]))
    }, 1000)
  }
})

onUnmounted(() => {
  clearTimeout(bubbleTimer)
  clearTimeout(welcomeTimer)
})
</script>

<style scoped>
.corner-pony-widget {
  --pony-slide-duration: 0.3s;
  position: fixed;
  inset: 0;
  overflow: clip;
  pointer-events: none;
  z-index: 1000;
}

.corner-pony {
  --pony-right-offset: 100px;
  position: absolute;
  bottom: 140px;
  right: var(--pony-right-offset);
  width: 120px;
  height: 120px;
  z-index: 1000;
  pointer-events: auto;
  transition: transform var(--pony-slide-duration) ease, visibility 0s;
}

.corner-pony.is-collapsed {
  transform: translateX(calc(100% + var(--pony-right-offset) + 24px));
  visibility: hidden;
  pointer-events: none;
  transition-delay: 0s, var(--pony-slide-duration);
}

.pony-img {
  width: 240px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.pony-bubble {
  position: absolute;
  bottom: 110px;
  left: 55%;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid rgba(230, 230, 230, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 12px 16px;
  max-width: 200px;
  min-width: 120px;
  text-align: center;
  font-size: 12px;
  color: #333;
  z-index: 1001;
  pointer-events: none;
}
.bubble-enter-active {
  animation: bubblePop 0.3s ease-out;
}
.bubble-leave-active {
  transition: opacity 0.2s ease, filter 0.2s ease;
}
.bubble-leave-to {
  opacity: 0;
  filter: blur(3px);
}
@keyframes bubblePop {
  from {
    transform: translateY(5px);
    filter: blur(3px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

.pony-buttons {
  position: absolute;
  left: 5px;
  top: 50%;
  filter: blur(3px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform: translateY(-50%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1002;
}
.corner-pony:hover .pony-buttons,
.corner-pony:focus-within .pony-buttons {
  opacity: 1;
  visibility: visible;
  left: 0px;
  filter: blur(0px);
}

.pony-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid rgba(230, 230, 230, 0.7);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}
.pony-btn:hover {
  border-color: #999;
}
.pony-btn:focus-visible {
  outline: 2px solid #2c2c2c;
  outline-offset: 3px;
}
.pony-btn:active {
  transform: scale(0.9);
}
.pony-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.switch-btn,
.collapse-btn {
  background: #ffffffcb;
}

.pony-expand-btn {
  position: absolute;
  right: 0;
  bottom: 160px;
  width: 44px;
  height: 44px;
  border-radius: 22px 0 0 22px;
  background: #ffffffcb;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: auto;
}
.pony-expand-btn img {
  transform: rotate(180deg);
}
.pony-expand-enter-active,
.pony-expand-leave-active {
  transition: transform var(--pony-slide-duration) ease, opacity var(--pony-slide-duration) ease;
}
.pony-expand-enter-active {
  transition-delay: var(--pony-slide-duration);
}
.pony-expand-btn.pony-expand-enter-from,
.pony-expand-btn.pony-expand-leave-to {
  transform: translateX(calc(100% + 12px));
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .corner-pony-widget {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .corner-pony-widget {
    --pony-slide-duration: 0s;
  }
}
</style>
