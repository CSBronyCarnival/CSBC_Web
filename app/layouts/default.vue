<template>
  <div>
    <SideNav />
    <slot />
    <AppFooter :key="$route.path" />
  </div>
</template>
