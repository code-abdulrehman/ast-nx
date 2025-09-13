<template>
  <div class="min-h-screen flex flex-col">
    <BannerBar variant="colorful" />
    <!-- Header -->
    <Header />
    
    <!-- Main Content Area -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import BannerBar from '~/components/BannerBar.vue'
</script>