<template>
  <div v-if="showMetrics && isDev" class="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
    <div class="space-y-1">
      <div>FP: {{ firstPaint }}ms</div>
      <div>FCP: {{ firstContentfulPaint }}ms</div>
      <div>LCP: {{ largestContentfulPaint }}ms</div>
      <div>CLS: {{ cumulativeLayoutShift }}</div>
    </div>
    <button @click="showMetrics = false" class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-xs">×</button>
  </div>
  <button v-else @click="showMetrics = true" class="fixed bottom-4 left-4 bg-white/30 shadow-sm backdrop-blur-sm text-primary p-3 rounded-lg text-xs font-mono z-50">
    <IconPerformance  />
  </button>
</template>

<script setup>
const isDev = process.dev
const showMetrics = ref(true)

const firstPaint = ref(0)
const firstContentfulPaint = ref(0)
const largestContentfulPaint = ref(0)
const cumulativeLayoutShift = ref(0)

onMounted(() => {
  if (!isDev) return

  // Performance monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-paint') {
        firstPaint.value = Math.round(entry.startTime)
      }
      if (entry.name === 'first-contentful-paint') {
        firstContentfulPaint.value = Math.round(entry.startTime)
      }
      if (entry.entryType === 'largest-contentful-paint') {
        largestContentfulPaint.value = Math.round(entry.startTime)
      }
      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        cumulativeLayoutShift.value += entry.value
      }
    }
  })

  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] })

  // Log performance metrics
  setTimeout(() => {
    console.log('Performance Metrics:', {
      FP: firstPaint.value + 'ms',
      FCP: firstContentfulPaint.value + 'ms',
      LCP: largestContentfulPaint.value + 'ms',
      CLS: cumulativeLayoutShift.value
    })
  }, 3000)
})
</script>
