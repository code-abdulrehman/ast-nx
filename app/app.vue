<template>

  <!-- Main Content -->
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage :dir="locale" />
  </NuxtLayout>
</template>

<script setup>
import * as locales from '@nuxt/ui/locale'

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

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>