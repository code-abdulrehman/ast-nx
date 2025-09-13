<template>
  <div>
    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <CarouselSection />
      
      <!-- Trusted Brands -->
      <Trusted />
      
      <!-- Products Listing -->
      <div v-if="isLoading" class="container mx-auto px-4 py-8">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p class="mt-2">Loading products...</p>
        </div>
      </div>
      <ProductListing 
        v-else
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

// Products data
const { products, featured, gamingProducts, isLoading, hasError } = useProducts()

// Debug logging
watchEffect(() => {
  console.log('Products data:', { products: products.value, featured: featured.value, isLoading: isLoading.value })
})

// Set page title and meta
useHead({
  title: 'Abdulrehman Sapra Telecom - Your Trusted Telecom Partner',
  meta: [
    { name: 'description', content: 'Leading telecom solutions provider offering quality products and services' }
  ]
})

// Handle loading and error states
if (hasError.value) {
  console.error('Failed to load products:', hasError.value)
}
</script>