<template>
  <div>
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <main class="min-h-screen bg-gray-50">
      <div v-if="isLoading" class="container mx-auto px-4 py-8">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p class="mt-2">Loading product...</p>
        </div>
      </div>
      
      <div v-else-if="!product" class="container mx-auto px-4 py-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button 
            @click="$router.push('/')"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {{ back }}
          </button>
        </div>
      </div>
      
      <div v-else class="container mx-auto px-4 py-8">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <button 
            @click="$router.push('/')"
            class="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            <i class="fa-solid fa-arrow-left"></i>
            {{ back }}
          </button>
        </nav>
        
        <!-- Product Details -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- Product Images -->
            <div class="space-y-4">
              <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  :src="product.product_feature_img" 
                  :alt="product.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div 
                  v-for="(image, index) in product.product_images.slice(0, 3)" 
                  :key="index"
                  class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.title} ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <!-- Product Info -->
            <div class="space-y-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>
                <p class="text-gray-600 text-lg">{{ product.description }}</p>
              </div>
              
              <!-- Price -->
              <div class="flex items-center gap-4">
                <span class="text-3xl font-bold text-blue-600">Rs.{{ product.discount_price }}</span>
                <span class="text-xl text-gray-500 line-through">Rs.{{ product.current_price }}</span>
                <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {{ product.discount_percentage }}% {{ off }}
                </span>
              </div>
              
              <!-- Rating -->
              <div class="flex items-center gap-2">
                <div class="flex">
                  <i 
                    v-for="i in 5" 
                    :key="i"
                    :class="[
                      'fa-solid fa-star',
                      i <= Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'
                    ]"
                  ></i>
                </div>
                <span class="text-gray-600">{{ product.ratings }} ({{ product.reviews }} {{ reviews }})</span>
              </div>
              
              <!-- Stock Status -->
              <div class="flex items-center gap-2">
                <span :class="[
                  'w-3 h-3 rounded-full',
                  product.product_stock > 0 ? 'bg-green-500' : 'bg-red-500'
                ]"></span>
                <span class="text-gray-600">
                  {{ product.product_stock > 0 ? `${stock}: ${product.product_stock}` : 'Out of Stock' }}
                </span>
              </div>
              
              <!-- Product Details -->
              <div class="space-y-4">
                <h3 class="text-xl font-semibold">{{ productInfo }}</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-600">{{ category }}:</span>
                    <span class="ml-2">{{ product.category }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-600">{{ country }}:</span>
                    <span class="ml-2">{{ product.made_country }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-600">{{ sku }}:</span>
                    <span class="ml-2">{{ product.series }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-600">Mood:</span>
                    <span class="ml-2">{{ product.mood }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Specifications -->
              <div class="space-y-4">
                <h3 class="text-xl font-semibold">{{ specifications }}</h3>
                <div class="grid grid-cols-1 gap-2 text-sm">
                  <div 
                    v-for="(value, key) in product.specs" 
                    :key="key"
                    class="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span class="font-medium text-gray-600 capitalize">{{ key.replace('_', ' ') }}:</span>
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-4">
                <button 
                  :disabled="product.product_stock === 0"
                  class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </button>
                <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors">
                  <i class="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { useQuickData } from '~/composables/useLanguageSnippets'
import { useProducts } from '~/composables/useProducts'

// Get route params
const route = useRoute()
const productId = parseInt(route.params.id)

// Language data
const { 
  back, 
  off, 
  reviews, 
  stock, 
  productInfo, 
  category, 
  country, 
  sku, 
  specifications 
} = useQuickData()

// Products data
const { getProductById, isLoading } = useProducts()

// Get product data
const product = ref(null)

onMounted(async () => {
  try {
    product.value = await getProductById(productId)
  } catch (error) {
    console.error('Failed to load product:', error)
  }
})

// Set page title
useHead({
  title: computed(() => product.value ? `${product.value.title} - Abdulrehman Sapra Telecom` : 'Product - Abdulrehman Sapra Telecom')
})
</script>