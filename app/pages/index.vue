<template>
  <div class="bg-gray-100">
    <!-- Main Content - No Loading State -->
    <main>
      <!-- Hero Section -->
      <CarouselSection />
      
      <!-- Trusted Brands -->
      <Trusted />
      
      <!-- Products Listing -->
      <ProductListing 
        :featureProducts="featured || []"
        :products="products || []"
      />
    </main>
  </div>
</template>

<script setup>
import CarouselSection from '~/components/CarouselSection.vue'
import Trusted from '~/components/Trusted.vue'
import ProductListing from '~/components/ProductListing.vue'
import { useQuickData } from '~/composables/useLanguageSnippets'
import { useProducts } from '~/composables/useProducts'

// Language data
const { logoText, logoDescription, navStore } = useQuickData()

// Products data - instant loading since data is hardcoded
const { products, featured, gamingProducts } = useProducts()

// Set page title and meta
useHead({
  title: 'Abdulrehman Sapra Telecom - Your Trusted Telecom Partner',
  meta: [
    { name: 'description', content: 'Leading telecom solutions provider offering quality products and services' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// Preload critical resources for faster rendering
onMounted(() => {
  // Preload critical images
  const criticalImages = [
    '/ast/banners/main-banner.webp',
    '/ast/products/ast-g1.webp',
    '/ast/products/ast-g2.webp'
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
})
</script>