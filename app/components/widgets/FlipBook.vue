<template>
  <ClientOnly>
    <div
      class="flipbook-outer"
      tabindex="0"
      @keydown.left.prevent="goPrev"
      @keydown.right.prevent="goNext"
    >
      <div v-if="loading" class="flipbook-status">
        <div class="flipbook-spinner-slot">
          <LoadingSpinner :visible="loading" />
        </div>
        <p>正在加载场刊… {{ progress }}%</p>
      </div>
      <div v-else-if="error" class="flipbook-status flipbook-error">
        <p>PDF 加载失败</p>
        <p class="flipbook-error-msg">{{ error }}</p>
      </div>

      <div v-else class="flipbook-stage">
        <div class="flipbook-book-wrap" :class="{ 'is-cover': currentPage === 1 && !isMobile, 'is-last': currentPage === totalPages && !isMobile }">
          <div ref="bookRef" id="flipbook" class="flipbook-book"></div>
        </div>

        <div class="flipbook-nav">
          <ClickTilt>
            <button
              class="flipbook-btn"
              :disabled="currentPage <= 1"
              @click="goPrev"
              :aria-label="$t('conbook.prev')"
            >
              {{ $t('conbook.prev') }}
            </button>
          </ClickTilt>

          <span class="flipbook-page-num">{{ currentPage }} / {{ totalPages }}</span>

          <ClickTilt>
            <button
              class="flipbook-btn"
              :disabled="currentPage >= totalPages"
              @click="goNext"
              :aria-label="$t('conbook.next')"
            >
              {{ $t('conbook.next') }}
            </button>
          </ClickTilt>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

const props = defineProps({
  pdfUrl: { type: String, required: true }
})

const MOBILE_BP = 768

const loading = ref(true)
const error = ref('')
const progress = ref(0)
const totalPages = ref(0)
const currentPage = ref(1)

const bookRef = ref(null)
const isMobile = ref(false)

let $ = null
let pdfDoc = null
let pdfLoadingTask = null
let turnReady = false
let disposed = false
let renderGeneration = 0
let pageWindowRequest = 0
let currentRenderScale = 1
let wantedPages = new Set()
const pageElements = new Map()
const pageCanvases = new Map()
const pageRenderPromises = new Map()
const activeRenderTasks = new Map()

function loadTurnJs() {
  return new Promise((resolve, reject) => {
    if (turnReady || $?.fn?.turn) {
      turnReady = true
      return resolve()
    }
    const script = document.createElement('script')
    script.src = '/lib/js/turn.js'
    script.onload = () => { turnReady = true; resolve() }
    script.onerror = () => reject(new Error('turn.js 加载失败'))
    document.head.appendChild(script)
  })
}

async function renderPageToCanvas(pageNumber, scale, generation) {
  const page = await pdfDoc.getPage(pageNumber)
  if (disposed || generation !== renderGeneration || !wantedPages.has(pageNumber)) return null

  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法创建 PDF 画布')
  ctx.imageSmoothingEnabled = false

  const renderTask = page.render({ canvasContext: ctx, viewport })
  activeRenderTasks.set(pageNumber, renderTask)

  try {
    await renderTask.promise
  } catch (err) {
    if (err?.name === 'RenderingCancelledException') return null
    throw err
  } finally {
    if (activeRenderTasks.get(pageNumber) === renderTask) {
      activeRenderTasks.delete(pageNumber)
    }
  }

  if (disposed || generation !== renderGeneration || !wantedPages.has(pageNumber)) {
    canvas.width = 0
    canvas.height = 0
    return null
  }

  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.objectFit = 'contain'
  return canvas
}

function calcBookLayout(nativePageW, nativePageH, mobile) {
  const maxWidth = Math.min(window.innerWidth - (mobile ? 24 : 40), mobile ? 600 : 1100)
  const maxHeight = window.innerHeight * (mobile ? 0.78 : 0.7)

  let bookWidth = mobile ? nativePageW : nativePageW * 2
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

  const targetPageW = mobile ? bookWidth : bookWidth / 2
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const renderScale = (targetPageW * dpr) / nativePageW

  return { bookWidth, bookHeight, renderScale }
}

function getPageRange(center, radius) {
  const start = Math.max(1, center - radius)
  const end = Math.min(totalPages.value, center + radius)
  const pages = []
  for (let page = start; page <= end; page++) pages.push(page)
  return pages
}

function getVisiblePages(page) {
  if (isMobile.value || page <= 1) return [page]
  const pairedPage = page % 2 === 0 ? page + 1 : page - 1
  return [page, pairedPage].filter(value => value >= 1 && value <= totalPages.value)
}

function attachCanvas(pageNumber, canvas) {
  const pageElement = pageElements.get(pageNumber)
  if (!pageElement || canvas.parentElement === pageElement) return
  pageElement.replaceChildren(canvas)
}

function evictUnwantedPages() {
  pageCanvases.forEach((canvas, pageNumber) => {
    if (wantedPages.has(pageNumber)) return
    canvas.remove()
    canvas.width = 0
    canvas.height = 0
    pageCanvases.delete(pageNumber)
  })
}

function resetPageRendering(centerPage) {
  renderGeneration += 1
  pageWindowRequest += 1
  wantedPages = new Set(getPageRange(centerPage, 4))

  activeRenderTasks.forEach(task => task.cancel())
  activeRenderTasks.clear()
  pageRenderPromises.clear()

  pageCanvases.forEach((canvas) => {
    canvas.remove()
    canvas.width = 0
    canvas.height = 0
  })
  pageCanvases.clear()
  pageElements.clear()
}

function ensurePageRendered(pageNumber, scale = currentRenderScale, generation = renderGeneration) {
  if (
    disposed
    || pageNumber < 1
    || pageNumber > totalPages.value
    || generation !== renderGeneration
    || !wantedPages.has(pageNumber)
  ) return Promise.resolve(null)

  const cachedCanvas = pageCanvases.get(pageNumber)
  if (cachedCanvas) {
    attachCanvas(pageNumber, cachedCanvas)
    return Promise.resolve(cachedCanvas)
  }

  const pendingRender = pageRenderPromises.get(pageNumber)
  if (pendingRender) return pendingRender

  let renderPromise
  renderPromise = renderPageToCanvas(pageNumber, scale, generation)
    .then((canvas) => {
      if (canvas && generation === renderGeneration && wantedPages.has(pageNumber)) {
        pageCanvases.set(pageNumber, canvas)
        attachCanvas(pageNumber, canvas)
      }
      return canvas
    })
    .finally(() => {
      if (pageRenderPromises.get(pageNumber) === renderPromise) {
        pageRenderPromises.delete(pageNumber)
      }
    })

  pageRenderPromises.set(pageNumber, renderPromise)
  return renderPromise
}

function schedulePagesAround(page) {
  wantedPages = new Set(getPageRange(page, 4))
  evictUnwantedPages()

  const request = ++pageWindowRequest
  const pages = getPageRange(page, isMobile.value ? 2 : 3)
    .sort((a, b) => Math.abs(a - page) - Math.abs(b - page))

  void (async () => {
    for (const pageNumber of pages) {
      if (disposed || request !== pageWindowRequest) return
      await ensurePageRendered(pageNumber)
    }
  })().catch((err) => {
    if (!disposed && err?.name !== 'RenderingCancelledException') {
      console.error('FlipBook: 页面渲染失败', err)
    }
  })
}

function initTurn(bookW, bookH, mobile, startPage) {
  const bookEl = bookRef.value
  if (!bookEl) return

  bookEl.innerHTML = ''
  bookEl.style.width = bookW + 'px'
  bookEl.style.height = bookH + 'px'
  pageElements.clear()

  for (let pageNumber = 1; pageNumber <= totalPages.value; pageNumber++) {
    const pageDiv = document.createElement('div')
    pageDiv.style.width = '100%'
    pageDiv.style.height = '100%'
    pageDiv.style.overflow = 'hidden'
    pageDiv.style.background = '#fff'
    bookEl.appendChild(pageDiv)
    pageElements.set(pageNumber, pageDiv)

    const canvas = pageCanvases.get(pageNumber)
    if (canvas) attachCanvas(pageNumber, canvas)
  }

  $('#flipbook').turn({
    display: mobile ? 'single' : 'double',
    acceleration: true,
    gradients: !mobile,
    autoCenter: true,
    duration: 600,
    page: startPage || 1,
    turnCorners: 'bl,br',
    when: {
      turned: function (_e, page) {
        currentPage.value = page
        schedulePagesAround(page)
      },
      turning: function (_e, page) {
        currentPage.value = page
        schedulePagesAround(page)
      }
    }
  })
}

function goNext() {
  if (!$ || currentPage.value >= totalPages.value) return
  $('#flipbook').turn('next')
}

function goPrev() {
  if (!$ || currentPage.value <= 1) return
  $('#flipbook').turn('previous')
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(async () => {
    if (disposed || !pdfDoc) return

    try {
      const nowMobile = window.innerWidth < MOBILE_BP
      if (nowMobile === isMobile.value) return

      const savedPage = currentPage.value
      isMobile.value = nowMobile

      try { $('#flipbook').turn('destroy') } catch (_) { /* ignore */ }

      const firstPage = await pdfDoc.getPage(1)
      const nativeView = firstPage.getViewport({ scale: 1 })
      const layout = calcBookLayout(nativeView.width, nativeView.height, isMobile.value)
      currentRenderScale = layout.renderScale
      resetPageRendering(savedPage)

      const generation = renderGeneration
      for (const pageNumber of getVisiblePages(savedPage)) {
        await ensurePageRendered(pageNumber, currentRenderScale, generation)
      }
      if (disposed || generation !== renderGeneration) return

      await nextTick()
      initTurn(layout.bookWidth, layout.bookHeight, isMobile.value, savedPage)
      schedulePagesAround(savedPage)
    } catch (err) {
      if (!disposed && err?.name !== 'RenderingCancelledException') {
        console.error('FlipBook: 调整尺寸失败', err)
      }
    }
  }, 300)
}

onMounted(async () => {
  disposed = false
  window.addEventListener('resize', onResize)

  isMobile.value = window.innerWidth < MOBILE_BP

  try {
    const jqModule = await import('jquery')
    $ = jqModule.default
    window.jQuery = window.$ = $

    const [_, pdfjsLib] = await Promise.all([
      loadTurnJs(),
      import('pdfjs-dist')
    ])

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

    pdfLoadingTask = pdfjsLib.getDocument({ url: props.pdfUrl })

    pdfLoadingTask.onProgress = (data) => {
      if (data.total > 0) {
        progress.value = Math.round((data.loaded / data.total) * 70)
      }
    }

    pdfDoc = await pdfLoadingTask.promise
    if (disposed) return
    totalPages.value = pdfDoc.numPages
    progress.value = 70

    const firstPage = await pdfDoc.getPage(1)
    const nativeView = firstPage.getViewport({ scale: 1 })
    const layout = calcBookLayout(nativeView.width, nativeView.height, isMobile.value)
    currentRenderScale = layout.renderScale
    resetPageRendering(1)

    await ensurePageRendered(1)
    if (disposed) return

    progress.value = 100

    loading.value = false
    await nextTick()

    initTurn(layout.bookWidth, layout.bookHeight, isMobile.value, 1)
    schedulePagesAround(1)
  } catch (err) {
    if (disposed || err?.name === 'RenderingCancelledException') return
    console.error('FlipBook: 加载失败', err)
    error.value = err.message || '未知错误'
    loading.value = false
  }
})

onUnmounted(() => {
  disposed = true
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
  if ($) {
    try { $('#flipbook').turn('destroy') } catch (_) { /* ignore */ }
  }
  resetPageRendering(currentPage.value)
  const loadingDestroy = pdfLoadingTask?.destroy()
  loadingDestroy?.catch?.(() => {})
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
  overflow-y: hidden;
  overflow-x: hidden;
}

.flipbook-status {
  position: relative;
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
.flipbook-spinner-slot {
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
}

.flipbook-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flipbook-book-wrap {
  transition: transform 0.4s ease;
}
.flipbook-book-wrap.is-cover {
  transform: translateX(-25%);
}
.flipbook-book-wrap.is-last {
  transform: translateX(25%);
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
