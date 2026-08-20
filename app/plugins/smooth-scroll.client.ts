import { defineNuxtPlugin } from '#app'
import Lenis from 'lenis'

declare global {
  interface Window {
    csbcSmoothScrollCleanup?: () => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  window.csbcSmoothScrollCleanup?.()

  const lenis = new Lenis({
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

  let lastPageKey = ''

  nuxtApp.hook('page:finish', () => {
    const pageKey = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (pageKey === lastPageKey) return
    const isInitialPage = !lastPageKey
    lastPageKey = pageKey

    window.requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          lenis.scrollTo(target, { offset: -80 })
          return
        }
      }

      if (!isInitialPage) {
        lenis.scrollTo(0, { immediate: true })
      }
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
