<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
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
}
</style>
