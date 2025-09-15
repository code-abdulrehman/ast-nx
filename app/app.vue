<template>
  <!-- Optimized Loading Indicator -->
  <NuxtLoadingIndicator  
    color="repeating-linear-gradient(to right,#057a55,#22c55e,#86efac)" 
    :height="3"
    :throttle="100"
    :duration="2000"
  />
  
  <!-- Main Content -->
  <NuxtLayout>
    <NuxtPage :dir="locale" />
  </NuxtLayout>
  
  <!-- Performance Monitor (Dev Only) -->
  <PerformanceMonitor v-if="isDev" />
</template>

<script setup>
import * as locales from '@nuxt/ui/locale'
import PerformanceMonitor from '~/components/PerformanceMonitor.vue'
const isDev = process.dev
const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
</script>

<style>
/* Performance optimizations */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Skeleton animations - optimized */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Critical CSS for above-the-fold content */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Optimize images */
img {
  content-visibility: auto;
}

/* Reduce layout shifts */
.aspect-square {
  aspect-ratio: 1 / 1;
}

/* Optimize animations */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-spin {
    animation: none;
  }
}
</style>