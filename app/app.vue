<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@font-face {
  font-family: "OPPOSans-Ver2-Bold";
  src: url(https://www.oppo.com/content/dam/statics/fonts/cn/OPPOSans3.0cn-Bold.woff2) format("woff2");
  font-variation-settings: 'wght' 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'OPPOSans-Bold';
  src: url(https://www.oppo.com/content/dam/statics/fonts/cn/OPPOSans-B.woff2) format("woff2");
  font-style: normal;
  font-display: swap
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'OPPOSans-Ver2-Bold', 'OPPOSans-Bold', 'Arial', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  transition: background-color 0.3s ease;
}
body.night {
  background-color: #121212;
  color: #e0e0e0;
}

/* 页面切换淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
