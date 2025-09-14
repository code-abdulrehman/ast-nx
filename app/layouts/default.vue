<template>
  <div class="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
    <BannerBar variant="colorful" />
    <!-- Header -->
    <Header />

    <!-- Main Content Area -->
    <main class="flex-1 overflow-x-hidden">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
      <button
        aria-label="ast-scroll-to-top-button"
        id="scroll-to-top"
        class="fixed bottom-4 right-4 z-50 w-10 h-10 bg-primary hover:bg-primary/80 text-white p-2 rounded-full shadow-lg transition-colors flex items-center justify-center"
        @click="scrollToTop"
        v-show="showScrollToTop"
      >
        <IconArrowUp />
      </button>

  </div>
</template>

<script setup>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  import BannerBar from '~/components/BannerBar.vue'
  import { IconArrowUp } from '#components';
  import { ref } from 'vue';
  
  const showScrollToTop = ref(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onMounted(() => {
    window.addEventListener('scroll', () => {
      showScrollToTop.value = window.scrollY > 100;
    });
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', () => {
      showScrollToTop.value = window.scrollY > 100;
    });
  });
</script>