import { defineNuxtPlugin } from '#app'

interface LenisOptions {
  lerp?: number
  wheelMultiplier?: number
  smoothWheel?: boolean
}

interface LenisInstance {
  raf: (time: number) => void
  scrollTo: (
    target: number | HTMLElement,
    options?: { offset?: number; immediate?: boolean },
  ) => void
  destroy: () => void
}

type LenisConstructor = new (options?: LenisOptions) => LenisInstance

declare global {
  interface Window {
    Lenis?: LenisConstructor
    csbcSmoothScrollCleanup?: () => void
  }
}

function loadLenisScript() {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-csbc-lenis]')
    if (existingScript) {
      if (window.Lenis) {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Lenis')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = '/lib/js/lenis.min.js'
    script.async = true
    script.dataset.csbcLenis = 'true'
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Unable to load Lenis')), { once: true })
    document.head.appendChild(script)
  })
}

export default defineNuxtPlugin(async (nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  try {
    await loadLenisScript()
  } catch {
    return
  }

  if (!window.Lenis) return

  window.csbcSmoothScrollCleanup?.()

  const lenis = new window.Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
  })

  let animationFrame = 0
  const raf = (time: number) => {
    lenis.raf(time)
    animationFrame = window.requestAnimationFrame(raf)
  }
  animationFrame = window.requestAnimationFrame(raf)

  const previousScrollRestoration = window.history.scrollRestoration
  window.history.scrollRestoration = 'manual'
  nuxtApp.provide('lenis', lenis)

  nuxtApp.hook('page:finish', () => {
    window.requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          lenis.scrollTo(target, { offset: -80 })
          return
        }
      }

      lenis.scrollTo(0, { immediate: true })
    })
  })

  const cleanup = () => {
    window.cancelAnimationFrame(animationFrame)
    lenis.destroy()
    window.history.scrollRestoration = previousScrollRestoration
    if (window.csbcSmoothScrollCleanup === cleanup) {
      delete window.csbcSmoothScrollCleanup
    }
  }

  window.csbcSmoothScrollCleanup = cleanup
})
