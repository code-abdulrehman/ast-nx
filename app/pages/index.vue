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
import { useProducts } from '~/composables/useProducts'

// Products data - instant loading since data is hardcoded
const { products, featured, gamingProducts } = useProducts()

// Set page title and meta
useHead({
  title: 'AST Earbuds | Best Wireless Earbuds & Audio Accessories',
  meta: [
    { name: 'description', content: 'AST offers the best wireless earbuds, fast chargers, and audio accessories. Discover high-quality sound, advanced features, and affordable prices. Shop AST for your next audio upgrade!' },
    { name: 'keywords', content: 'AST, wireless earbuds, fast chargers, audio accessories, high-quality sound, advanced features, affordable prices, best wireless earbuds, best audio accessories' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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