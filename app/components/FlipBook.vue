<template>
  <ClientOnly>
    <div class="flipbook-outer">
      <!-- 加载 / 错误状态 -->
      <div v-if="loading" class="flipbook-status">
        <div class="flipbook-spinner"></div>
        <p>正在加载场刊…</p>
      </div>
      <div v-else-if="error" class="flipbook-status flipbook-error">
        <p>场刊加载失败</p>
        <p class="flipbook-error-msg">{{ error }}</p>
      </div>

      <!-- 书本主体 -->
      <div v-else class="flipbook-stage">
        <!-- turn.js 书本体 -->
        <div ref="bookRef" id="flipbook" class="flipbook-book"></div>

        <!-- 底部导航 -->
        <div class="flipbook-nav">
          <button
            class="flipbook-btn"
            :disabled="currentPage <= 1"
            @click="goPrev"
            aria-label="上一页"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
            上一页
          </button>

          <span class="flipbook-page-num">{{ currentPage }} / {{ totalPages }}</span>

          <button
            class="flipbook-btn"
            :disabled="currentPage >= totalPages"
            @click="goNext"
            aria-label="下一页"
          >
            下一页
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  pdfUrl: { type: String, required: true }
})

const loading = ref(true)
const error = ref('')
const totalPages = ref(0)
const currentPage = ref(1)

const bookRef = ref(null)

let $ = null
let turnReady = false

function loadTurnJs() {
  return new Promise((resolve, reject) => {
    if (turnReady) return resolve()
    const script = document.createElement('script')
    script.src = '/lib/js/turn.js'
    script.onload = () => { turnReady = true; resolve() }
    script.onerror = () => reject(new Error('turn.js 加载失败'))
    document.head.appendChild(script)
  })
}

async function renderPageToCanvas(page, scale) {
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  await page.render({ canvasContext: ctx, viewport }).promise
  return { canvas, viewport }
}

function calcBookLayout(nativePageW, nativePageH) {
  const maxWidth = Math.min(window.innerWidth - 40, 1100)
  const maxHeight = window.innerHeight * 0.7

  let bookWidth = nativePageW * 2
  let bookHeight = nativePageH

  if (bookWidth > maxWidth) {
    const s = maxWidth / bookWidth
    bookWidth = maxWidth
    bookHeight = Math.floor(nativePageH * s)
  }
  if (bookHeight > maxHeight) {
    const s = maxHeight / bookHeight
    bookHeight = maxHeight
    bookWidth = Math.floor(bookWidth * s)
  }

  const targetPageW = bookWidth / 2
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const renderScale = (targetPageW * dpr) / nativePageW

  return { bookWidth, bookHeight, renderScale }
}

function onKeyDown(e) {
  if (e.key === 'ArrowRight') goNext()
  else if (e.key === 'ArrowLeft') goPrev()
}

function goNext() {
  if (!$ || currentPage.value >= totalPages.value) return
  $('#flipbook').turn('next')
}

function goPrev() {
  if (!$ || currentPage.value <= 1) return
  $('#flipbook').turn('previous')
}

onMounted(async () => {
  document.addEventListener('keydown', onKeyDown)

  let pdfDoc = null
  let canvases = []
  let bookW = 0
  let bookH = 0

  try {
    const jqModule = await import('jquery')
    $ = jqModule.default
    window.jQuery = window.$ = $

    const [_, pdfjsLib] = await Promise.all([
      loadTurnJs(),
      import('pdfjs-dist')
    ])

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://unpkg.com/pdfjs-dist@6.1.200/build/pdf.worker.min.mjs'

    const loadingTask = pdfjsLib.getDocument({ url: props.pdfUrl })
    pdfDoc = await loadingTask.promise
    totalPages.value = pdfDoc.numPages

    const firstPage = await pdfDoc.getPage(1)
    const nativeView = firstPage.getViewport({ scale: 1 })
    const layout = calcBookLayout(nativeView.width, nativeView.height)
    bookW = layout.bookWidth
    bookH = layout.bookHeight
    const renderScale = layout.renderScale

    const canvasPromises = []
    for (let i = 1; i <= totalPages.value; i++) {
      canvasPromises.push(
        pdfDoc.getPage(i).then(p => renderPageToCanvas(p, renderScale))
      )
    }
    canvases = (await Promise.all(canvasPromises)).map(r => r.canvas)
  } catch (err) {
    console.error('FlipBook: 加载失败', err)
    error.value = err.message || '未知错误'
    loading.value = false
    return
  }

  loading.value = false
  await nextTick()

  const bookEl = bookRef.value
  if (!bookEl) {
    error.value = 'DOM 未就绪'
    return
  }

  bookEl.style.width = bookW + 'px'
  bookEl.style.height = bookH + 'px'

  canvases.forEach((canvas) => {
    const pageDiv = document.createElement('div')
    pageDiv.style.width = '100%'
    pageDiv.style.height = '100%'
    pageDiv.style.overflow = 'hidden'
    pageDiv.style.background = '#fff'

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.objectFit = 'contain'
    pageDiv.appendChild(canvas)

    bookEl.appendChild(pageDiv)
  })

  await nextTick()

  $('#flipbook').turn({
    display: 'double',
    acceleration: true,
    gradients: true,
    autoCenter: true,
    duration: 600,
    page: 1,
    turnCorners: 'bl,br',
    when: {
      turned: function (_e, page) {
        currentPage.value = page
      },
      turning: function (_e, page) {
        currentPage.value = page
      }
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  if ($) {
    try { $('#flipbook').turn('destroy') } catch (_) { /* ignore */ }
  }
  delete window.jQuery
  delete window.$
})
</script>

<style>
#flipbook .turn-page {
  background-color: #fff;
}
</style>

<style scoped>
.flipbook-outer {
  width: 100%;
}

.flipbook-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
  font-size: 1rem;
}
.flipbook-error { color: #c0392b; }
.flipbook-error-msg {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 4px;
}
.flipbook-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #4fa7ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.flipbook-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flipbook-book {
  margin: 0 auto;
}

.flipbook-nav {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}
.flipbook-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.flipbook-btn:hover:not(:disabled) {
  background: #4fa7ff;
  color: #fff;
  border-color: #4fa7ff;
}
.flipbook-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.flipbook-page-num {
  font-size: 0.9rem;
  color: #888;
  min-width: 100px;
  text-align: center;
}

@media (max-width: 768px) {
  .flipbook-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
}
</style>
