import { defineNuxtPlugin } from '#app'
import VViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VViewer, {
    defaultOptions: {
      zIndex: 9999,
      navbar: false,
      title: false,
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        next: 4,
        play: false,
        flipHorizontal: 4,
        flipVertical: 4,
      },
    },
  })
})
