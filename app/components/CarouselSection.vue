<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue"
import { useRouter } from "vue-router"
import Button from "./Button.vue"
import { useProducts } from '~/composables/useProducts'
import { usePriceCalculator } from '~/composables/usePriceCalculator'

// Get current locale for URL preservation
const { locale } = useI18n()

const currentSlide = ref(0)
const isAutoPlaying = ref(true)
const direction = ref(0) // -1 prev, 1 next, 0 direct
const isAnimating = ref(false)
const timeoutRef = ref(null)
const animationDuration = 500 // ms
const router = useRouter()

// Get products data
const { featured } = useProducts()
const { getPriceBreakdown, formatPriceDisplay } = usePriceCalculator()

// Generate localized product URL
const getLocalizedProductUrl = (productId) => {
  const baseUrl = `/product/${productId}`
  // If locale is 'en' (default), don't add prefix
  if (locale.value === 'en') {
    return baseUrl
  }
  // For other locales, add the locale prefix
  return `/${locale.value}${baseUrl}`
}

// Get first 3 featured products for carousel
const featuredProducts = computed(() => {
  if (featured.value && featured.value.length > 0) {
    return featured.value.slice(0, 3).map(product => ({
      id: product.product_id,
      title: product.title,
      description: product.description,
      banner_image: product.banner_image || product.product_feature_img,
      product_feature_img: product.product_feature_img,
      original_price: product.original_price,
      discount_percentage: product.discount_percentage,
      priceBreakdown: getPriceBreakdown(product.original_price, product.discount_percentage)
    }))
  }
  return []
})

// Convert relative paths to absolute URLs
const getAbsoluteUrl = (path) => {
  if (path.startsWith('http')) return path
  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  // For SSR, return the path as is
  return path
}

// Handle image loading errors
const handleImageError = (event) => {
  console.warn('CarouselSection image failed to load:', event.target.src)
  
  // Try fallback image first
  if (!event.target.dataset.fallbackTried) {
    event.target.dataset.fallbackTried = 'true'
    // Try a generic placeholder image
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
    return
  }
  
  // If fallback also fails, show placeholder
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  if (parent && !parent.querySelector('.image-placeholder')) {
    const placeholder = document.createElement('div')
    placeholder.className = 'image-placeholder absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200'
    placeholder.innerHTML = '<div class="text-gray-400 text-center"><div class="text-2xl mb-2">📷</div><div class="text-sm">Image not available</div></div>'
    parent.appendChild(placeholder)
  }
}

// Debug: Log image paths and test image loading
onMounted(() => {
  console.log('Featured products:', featuredProducts.value)
  featuredProducts.value.forEach((product, index) => {
    console.log(`Product ${index + 1}:`, {
      banner: product.banner_image,
      product: product.product_feature_img
    })
    
    // Test if images are accessible (only on client side)
    if (typeof window !== 'undefined') {
      const bannerUrl = getAbsoluteUrl(product.banner_image)
      const productUrl = getAbsoluteUrl(product.product_feature_img)
    }
  })
})

// autoplay
let interval = null
onMounted(() => {
  startAutoPlay()
})
onBeforeUnmount(() => {
  stopAutoPlay()
  if (timeoutRef.value) clearTimeout(timeoutRef.value)
})

watch(isAutoPlaying, (val) => {
  if (val) startAutoPlay()
  else stopAutoPlay()
})

function startAutoPlay() {
  stopAutoPlay()
  interval = setInterval(() => {
    if (featuredProducts.value.length > 0) {
      handleSlideChange((currentSlide.value + 1) % featuredProducts.value.length, 1)
    }
  }, 3000)
}
function stopAutoPlay() {
  if (interval) clearInterval(interval)
}

// slide change
function handleSlideChange(nextIndex, dir = 0) {
  if (isAnimating.value || featuredProducts.value.length === 0) return
  const total = featuredProducts.value.length
  let newIndex = ((nextIndex % total) + total) % total
  direction.value = dir
  isAnimating.value = true
  timeoutRef.value = setTimeout(() => {
    currentSlide.value = newIndex
    isAnimating.value = false
  }, animationDuration)
}

function goToSlide(index) {
  if (index === currentSlide.value || isAnimating.value) return
  isAutoPlaying.value = false
  handleSlideChange(index, index > currentSlide.value ? 1 : -1)
  setTimeout(() => (isAutoPlaying.value = true), 5000)
}

function goToPrevious() {
  if (isAnimating.value) return
  isAutoPlaying.value = false
  handleSlideChange(currentSlide.value - 1, -1)
  setTimeout(() => (isAutoPlaying.value = true), 5000)
}

function goToNext() {
  if (isAnimating.value) return
  isAutoPlaying.value = false
  handleSlideChange(currentSlide.value + 1, 1)
  setTimeout(() => (isAutoPlaying.value = true), 5000)
}

function getSlideClass(index) {
  const total = featuredProducts.value.length
  if (total === 0) return "translate-x-0 z-0"
  
  let rel = index - currentSlide.value
  if (rel > total / 2) rel -= total
  if (rel < -total / 2) rel += total

  if (rel === 0 && !isAnimating.value) return "translate-x-0 z-20"
  if (isAnimating.value) {
    if (rel === 0) {
      if (direction.value === 1) return "-translate-x-full z-10"
      if (direction.value === -1) return "translate-x-full z-10"
    }
    if (
      (direction.value === 1 && rel === 1) ||
      (direction.value === -1 && rel === -1)
    ) {
      return "translate-x-0 z-20"
    }
  }
  if (rel > 0) return "translate-x-full z-0"
  if (rel < 0) return "-translate-x-full z-0"
  return "translate-x-0 z-0"
}

function getVisibleSlides() {
  const total = featuredProducts.value.length
  if (total === 0) return []
  
  let slides = []
  for (let i = -1; i <= 1; i++) {
    let idx = (currentSlide.value + i + total) % total
    slides.push(idx)
  }
  return [...new Set(slides)]
}
</script>

<template>
  <div class="w-full container mx-auto px-4 py-1 md:h-[84vh] h-[63.5vh]">
    <div class="h-full relative">
      <!-- Fixed background -->
      <div v-if="featuredProducts.length > 0" class="absolute inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg">
        <img
          :src="getAbsoluteUrl(featuredProducts[currentSlide]?.banner_image)"
          alt="banner image"
          class="w-full h-full object-cover rounded-lg"
          loading="lazy"
          @error="handleImageError"
        />
        <!-- <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg" /> -->
      </div>

      <!-- Slides -->
      <div v-if="featuredProducts.length > 0" class="relative h-full overflow-hidden rounded-lg shadow-lg z-10">
        <div class="w-full h-full relative">
          <div
            v-for="idx in getVisibleSlides()"
            :key="featuredProducts[idx].id"
            :class="[
              'absolute inset-0 transition-transform ease-in-out',
              isAnimating ? 'duration-500' : 'duration-400',
              getSlideClass(idx)
            ]"
            style="transition-property: transform"
          >
            <div
              class="absolute inset-0 flex items-center justify-center flex-col md:flex-row gap-4"
            >
              <!-- Product Image -->
              <div
                class="w-[30%] md:h-full h-[43%] flex justify-center items-center aspect-square"
              >
                <img
                  :src="getAbsoluteUrl(featuredProducts[idx].product_feature_img)"
                  :alt="featuredProducts[idx].title"
                  class="w-auto h-auto object-cover rounded-lg block mx-2 md:scale-[0.7] scale-125 mb-4"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <!-- Text -->
              <div class="text-center text-white max-w-2xl px-6">
                <h2
                  class="md:text-4xl lg:text-5xl text-2xl font-bold md:mb-2 mb-[1px]"
                >
                  {{ featuredProducts[idx].title }}
                </h2>
                <div class="flex justify-center items-center">
                  <p class="md:text-xl text-xs w-full md:w-2/3 md:mb-4 mb-2">
                    {{ featuredProducts[idx].description }}
                  </p>
                </div>
                <div
                  v-if="featuredProducts[idx].priceBreakdown && featuredProducts[idx].priceBreakdown.percentage > 0"
                  class="flex items-center justify-center gap-4 md:mb-4 mb-3"
                >
                  <span
                    class="bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold"
                  >
                    {{ featuredProducts[idx].priceBreakdown.percentage }}% OFF
                  </span>
                </div>
                <div class="w-full flex justify-center items-center mb-2">
                  <Button
                    aria-label="ast-next-product-slide-button"
                    text="Shop Now"
                    color="white"
                    size="md"
                    variant="solid"
                    icon="arrow-right"
                    @click="() => router.push(getLocalizedProductUrl(featuredProducts[idx].id))"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav Arrows -->
      <button
        v-if="featuredProducts.length > 1"
        @click="goToPrevious"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors w-10 h-10 flex justify-center items-center z-30"
        aria-label="Previous slide"
        :disabled="isAnimating"
      >
        <IconChevronLeft class="w-4 h-4 text-white" />
      </button>
      <button
        v-if="featuredProducts.length > 1"
        @click="goToNext"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors w-10 h-10 flex justify-center items-center z-30"
        aria-label="Next slide"
        :disabled="isAnimating"
      >
        <IconChevronRight class="w-4 h-4 text-white" />
      </button>

      <!-- Dots -->
      <div
        v-if="featuredProducts.length > 1"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 items-center z-30"
      >
        <button
          v-for="(_, index) in featuredProducts"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-colors',
            index === currentSlide ? 'bg-white' : 'bg-white/50'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
          :disabled="isAnimating"
        />
      </div>
      
      <!-- No Products Fallback -->
      <div v-else class="relative h-full overflow-hidden rounded-lg shadow-lg z-10 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
        <div class="text-center text-white">
          <h2 class="text-2xl font-bold mb-2">No Featured Products</h2>
          <p class="text-lg opacity-90">Check back soon for amazing deals!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.translate-x-0 {
  transform: translateX(0%);
}
.translate-x-full {
  transform: translateX(100%);
}
.-translate-x-full {
  transform: translateX(-100%);
}
.transition-transform {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.duration-400 {
  transition-duration: 0.4s;
}
.duration-500 {
  transition-duration: 0.5s;
}
</style>
