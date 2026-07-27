<template>
  <div
    ref="rootRef"
    class="corner-pony"
    @click="onClick"
  >
    <img
      ref="imgRef"
      class="pony-img"
      :src="ponyImages[currentIndex]"
      alt="CSBC 小马"
    />

    <Transition name="bubble">
      <div v-if="bubbleVisible" class="pony-bubble">
        {{ bubbleText }}
      </div>
    </Transition>

    <div class="pony-buttons">
      <div class="pony-btn switch-btn" @click.stop="switchPony">
        <img src="/img/pony/button/switch.svg" alt="切换" />
      </div>
    </div>
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

const rootRef = ref(null)
const imgRef = ref(null)
const currentIndex = ref(-1)
const bubbleVisible = ref(false)
const bubbleText = ref('')
let bubbleTimer = null

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
  currentIndex.value = Math.floor(Math.random() * ponyImages.length)
  setTimeout(() => {
    showBubble(pick(messages.welcome[getTimeType()]))
  }, 1000)
})

onUnmounted(() => {
  clearTimeout(bubbleTimer)
})
</script>

<style scoped>
.corner-pony {
  position: fixed;
  bottom: 140px;
  right: 100px;
  width: 120px;
  height: 120px;
  z-index: 1000;
  transition: transform 0.3s ease;
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
.corner-pony:hover .pony-buttons {
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}
.pony-btn:hover {
  border-color: #999;
}
.pony-btn:active {
  transform: scale(0.9);
}
.pony-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.switch-btn {
  background: #ffffffcb;
}

@media (max-width: 768px) {
  .corner-pony {
    display: none;
  }
}
</style>
