<template>
  <div>
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div class="h-full bg-gradient-to-r from-primary to-green-500 animate-pulse"></div>
    </div>
    
    <!-- Main Content -->
    <main class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="isLoading || (!product && !loadingError)">
        <ProductSkeleton />
      </div>
      
      <!-- Product Not Found or Error -->
      <div v-else-if="loadingError || (!product && !isLoading)" class="container mx-auto px-4 py-8">
        <div class="text-center">
          <div class="mb-6">
            <Icon name="warning" size="lg" color="text-red-500" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            {{ loadingError ? 'Connection Error' : 'Product Not Found' }}
          </h1>
          <p class="text-gray-600 mb-4">
            {{ loadingError 
              ? 'There was a problem loading this product. Please check your connection and try again.' 
              : 'The product you\'re looking for doesn\'t exist.' 
            }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              text="Try Again"
              color="primary"
              size="md"
              variant="solid"
              @click="() => { loadingError = false; $router.go(0) }"
            />
            <Button
              text="Back to Shop"
              color="primary"
              size="md"
              variant="outline"
              @click="$router.push('/')"
            />
          </div>
        </div>
      </div>
      
      <!-- Product Details -->
      <div v-else class="container mx-auto transition-all ease-linear duration-300 overflow-x-hidden">
        <div class="md:p-4 px-4 py-2 flex flex-col items-start">
          <!-- Breadcrumb Navigation -->
          <nav class="mb-6">
            <button 
              @click="$router.push('/')"
              class="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
            >
              <Icon name="arrow-right" size="sm" custom-class="rotate-180" />
              {{ back }}
            </button>
          </nav>
        </div>

        <!-- Product Details Grid -->
        <div class="max-w-6xl mx-auto px-4 py-2">
          <div class="grid grid-cols-[auto] lg:grid-cols-2 gap-2 md:gap-8">
            <!-- Product Images -->
            <div class="space-y-4 flex flex-row md:flex-col justify-between md:justify-center md:items-center items-start gap-2">
              <!-- Main Image -->
                <div class="aspect-square rounded-lg overflow-hidden h-[36vh] md:h-[450px] w-[100%] flex-1 bg-gradient-to-b from-gray-400 to-gray-600">
                  <img
                    :src="getMainImage()"
                    :alt="product.title"
                    class="w-full object-cover drop-shadow-md shadow-primary h-full md:h-[450px]"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="hidden w-full h-full items-center justify-center bg-gray-200">
                    <div class="text-gray-400 text-center flex flex-col items-center justify-center h-full">
                      <Icon name="image" size="3xl" />
                      <p class="text-sm mt-2">Image not available</p>
                    </div>
                  </div>
                </div>
              
              <!-- Thumbnail Images -->
              <div v-if="getThumbnailImages().length > 0" class="grid md:grid-cols-4 grid-cols-1 grid-rows-2 md:grid-rows-1 gap-2" style="margin-top: 0px;">
                <button
                  v-for="(image, index) in getThumbnailImages()"
                  :key="index"
                  @click="setSelectedImage(index + 1)"
                  :class="[
                    'aspect-square rounded-lg overflow-hidden border-2 h-[10vh] md:h-full w-[10vh] md:w-full transition-all duration-200 bg-gradient-to-b from-gray-400 to-gray-600',
                    selectedImage === index + 1 ? 'border-primary' : 'border-gray-200 hover:border-primary/50'
                  ]"
                >
                  <img
                    :src="image"
                    :alt="`${product.title} ${index + 1}`"
                    class="w-full h-full object-cover drop-shadow-sm"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="hidden w-full h-full items-center justify-center bg-gray-200">
                    <Icon name="image" size="lg" color="text-gray-400" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="md:space-y-4 space-y-1">
              <!-- Title and Description -->
              <div>
                <h1 class="text-3xl font-bold text-gray-900 md:mb-2">{{ product.title }}</h1>
                <p class="text-gray-600 text-lg" style="line-height: 1.3;">{{ product.description }}</p>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2">
                <div class="flex">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    name="star-fill"
                    size="sm"
                    :color="i <= Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'"
                  />
                </div>
                <span v-if="product.reviews" class="text-gray-600">({{ product.reviews }} {{ reviews }})</span>
              </div>

              <!-- Price -->
              <div class="flex items-center gap-4">
                <span v-if="product.discount_price" class="text-3xl font-bold text-green-500">
                  Rs.{{ product.discount_price }}
                </span>
                <span v-if="product.current_price" class="text-xl line-through text-gray-500">
                  Rs.{{ product.current_price }}
                </span>
                <span v-if="product.discount_percentage" class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {{ product.discount_percentage }}% {{ off }}
                </span>
              </div>

              <!-- Stock Status -->
              <div v-if="product.product_stock" class="flex items-center gap-2">
                <span class="text-sm text-gray-600">{{ stock }}:</span>
                <span :class="[
                  'font-semibold',
                  product.product_stock > 50 ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ product.product_stock }} available
                </span>
              </div>

              <!-- WhatsApp Order Button -->
              <Button
                :text="product.product_stock > 0 ? 'Order via WhatsApp' : 'Pre Order via WhatsApp'"
                color="green"
                size="lg"
                variant="solid"
                icon="whatsapp"
                :full-width="true"
                @click="handleWhatsAppOrder"
              />

              <!-- Product Information -->
              <div>
                <h3 class="text-lg font-semibold mb-3">{{ productInfo }}</h3>
                <div class="space-y-2 text-sm pl-2">
                  <p><strong>{{ category }}:</strong> {{ product.category || "Electronics" }}</p>
                  <p><strong>{{ country }}:</strong> {{ product.made_country || "China" }}</p>
                  <p><strong>{{ sku }}:</strong> #{{ product.product_id || "N/A" }}</p>
                </div>
              </div>

              <!-- Keywords/Tags -->
              <div v-if="product.keywords && product.keywords.length > 0">
                <h3 class="text-lg font-semibold mb-2">Tags:</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(keyword, index) in product.keywords"
                    :key="index"
                    class="px-3 py-1 bg-primary/20 text-black text-sm rounded-full"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details Section -->
          <div v-if="product.detailed_features" class="mt-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
            <hr class="mb-6" />
            <div class="space-y-6">
              <div
                v-for="(features, category) in product.detailed_features"
                :key="category"
                class="p-2"
              >
                <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Icon name="star-fill" size="sm" color="text-gray-500" />
                  {{ category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                </h3>
                <div v-if="typeof features === 'object' && !Array.isArray(features)" class="space-y-3 pl-2">
                  <p
                    v-for="(value, key) in features"
                    :key="key"
                    class="text-gray-700"
                  >
                    <strong>{{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}:</strong> {{ value }}
                  </p>
                </div>
                <ul v-else-if="Array.isArray(features)" class="list-disc list-inside space-y-2 pl-2">
                  <li v-for="(feature, index) in features" :key="index" class="text-gray-700">{{ feature }}</li>
                </ul>
                <p v-else class="text-gray-700">{{ features }}</p>
              </div>
            </div>
          </div>

          <!-- Specifications Section -->
          <div v-if="product.specs || product.specifications" class="mt-8">
            <hr v-if="product.detailed_features" class="mb-8" />
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Icon name="specifications" size="sm" color="text-gray-900" />
              {{ specifications }}
            </h2>
            <div class="p-l-2">
              <div class="space-y-3 pl-2">
                <p
                  v-for="(value, key) in (product.specs || product.specifications)"
                  :key="key"
                  class="text-gray-700"
                >
                  <strong>{{ key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}:</strong> {{ value }}
                </p>
              </div>
            </div>
          </div>

          <!-- Related Products Section -->
          <div v-if="relatedProducts.length > 0" class="md:mt-16 mt-8" id="store">
            <hr class="mb-8" />
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
              Latest Products
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard
                v-for="relatedProduct in relatedProducts"
                :key="relatedProduct.product_id"
                :product="relatedProduct"
              />
            </div>

            <!-- View All Products Button -->
            <div class="text-center mt-8" id="store">
              <Button
                text="View All Products"
                color="primary"
                size="lg"
                variant="solid"
                icon="list"
                @click="navigateToHome"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useQuickData } from '~/composables/useLanguageSnippets'
import { useProducts } from '~/composables/useProducts'
import Button from '~/components/Button.vue'
import Icon from '~/components/Icon.vue'
import ProductCard from '~/components/ProductCard.vue'
import ProductSkeleton from '~/components/ProductSkeleton.vue'

// Get route params
const route = useRoute()
const router = useRouter()
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
const { getProductById, products, isLoading, hasError } = useProducts()

// State
const product = ref(null)
const selectedImage = ref(1)
const relatedProducts = ref([])
const loadingError = ref(false)

// Get product data
onMounted(async () => {
  try {
    loadingError.value = false
    console.log('Loading product with ID:', productId)
    
    const productData = await getProductById(productId)
    console.log('Product data received:', productData)
    
    if (productData && productData.product_id) {
      product.value = productData
      console.log('Product loaded successfully:', productData.title)
    } else {
      console.warn('Product not found with ID:', productId)
      loadingError.value = true
    }
  } catch (error) {
    console.error('Failed to load product:', error)
    loadingError.value = true
    
    // Show user-friendly error message
    if (error.message?.includes('socket hang up')) {
      console.error('Connection interrupted. Please check your internet connection.')
    }
  }
})

// Watch for products to be loaded and then get related products
watch([products, product], ([productsData, currentProduct]) => {
  if (productsData && productsData.length > 0 && currentProduct) {
    const otherProducts = productsData.filter(p => p.product_id !== currentProduct.product_id)
    
    if (otherProducts.length > 0) {
      // Use Fisher-Yates shuffle for better randomness
      const shuffled = [...otherProducts]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      relatedProducts.value = shuffled.slice(0, 3)
    }
  }
}, { immediate: true })

// Image selection
const setSelectedImage = (index) => {
  selectedImage.value = index
}

// Get main image with fallback
const getMainImage = () => {
  if (!product.value) return ''
  
  const images = product.value.product_images
  if (images && images.length > 0) {
    return images[selectedImage.value] || images[1] || images[0]
  }
  
  return product.value.product_feature_img || ''
}

// Get thumbnail images
const getThumbnailImages = () => {
  if (!product.value || !product.value.product_images) return []
  
  const images = product.value.product_images
  if (images.length > 1) {
    return images.slice(1, 3) // Get up to 2 thumbnails
  }
  
  return []
}

// WhatsApp order functionality
const handleWhatsAppOrder = () => {
  if (!product.value) return
  
  const message = `Hi! I want to order: ${product.value.title} - Rs.${product.value.discount_price} \n${window.location.href}`
  const whatsappUrl = `https://wa.me/+923066223005?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// Navigate to home
const navigateToHome = () => {
  router.push('/')
  // Scroll to top when navigating to home
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}

// Handle image loading errors
const handleImageError = (event) => {
  console.warn('Image failed to load:', event.target.src)
  // Hide the broken image and show a placeholder
  event.target.style.display = 'none'
  event.target.nextElementSibling?.classList.remove('hidden')
}

// Scroll to top when component mounts
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Set page title
useHead({
  title: computed(() => product.value ? `${product.value.title} - Abdulrehman Sapra Telecom` : 'Product - Abdulrehman Sapra Telecom')
})
</script>