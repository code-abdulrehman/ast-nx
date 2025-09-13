<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useRouter } from "vue-router"
import Button from "./Button.vue"

const currentSlide = ref(0)
const isAutoPlaying = ref(true)
const direction = ref(0) // -1 prev, 1 next, 0 direct
const isAnimating = ref(false)
const timeoutRef = ref(null)
const animationDuration = 500 // ms
const router = useRouter()

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

// Debug: Log image paths and test image loading
onMounted(() => {
  console.log('Featured products:', featuredProducts)
  featuredProducts.forEach((product, index) => {
    console.log(`Product ${index + 1}:`, {
      banner: product.banner_image,
      product: product.product_feature_img
    })
    
    // Test if images are accessible (only on client side)
    if (typeof window !== 'undefined') {
      const bannerUrl = getAbsoluteUrl(product.banner_image)
      const productUrl = getAbsoluteUrl(product.product_feature_img)
      
      const testBannerImg = new Image()
      testBannerImg.onload = () => console.log(`✅ Banner image ${index + 1} is accessible:`, bannerUrl)
      testBannerImg.onerror = () => console.log(`❌ Banner image ${index + 1} failed to load:`, bannerUrl)
      testBannerImg.src = bannerUrl
      
      const testProductImg = new Image()
      testProductImg.onload = () => console.log(`✅ Product image ${index + 1} is accessible:`, productUrl)
      testProductImg.onerror = () => console.log(`❌ Product image ${index + 1} failed to load:`, productUrl)
      testProductImg.src = productUrl
    }
  })
})

// Mock featured products data
const featuredProducts = [
  {
    id: 1,
    title: "AST G1 Premium",
    description: "Experience the ultimate in mobile.",
    banner_image: "/ast/banners/main-banner.webp",
    product_feature_img: "/ast/products/ast-g1.webp",
    discount_percentage: 25,
    product_price: 299.99,
    original_price: 399.99,
  },
  {
    id: 2,
    title: "AST G2 Pro",
    description: "Professional-grade smartphone with r.",
    banner_image: "/ast/banners/main-banner.webp",
    product_feature_img: "/ast/products/ast-g2.webp",
    discount_percentage: 20,
    product_price: 199.99,
    original_price: 249.99,
  },
  {
    id: 3,
    title: "AST G3 Max",
    description: "Maximum performance meets maximum value.",
    banner_image: "/ast/banners/main-banner.webp",
    product_feature_img: "/ast/products/ast-g3.webp",
    discount_percentage: 30,
    product_price: 149.99,
    original_price: 199.99,
  },
]

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
    handleSlideChange((currentSlide.value + 1) % featuredProducts.length, 1)
  }, 3000)
}
function stopAutoPlay() {
  if (interval) clearInterval(interval)
}

// slide change
function handleSlideChange(nextIndex, dir = 0) {
  if (isAnimating.value) return
  const total = featuredProducts.length
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
  const total = featuredProducts.length
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
  const total = featuredProducts.length
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
      <div class="absolute inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg">
        <img
          :src="getAbsoluteUrl(featuredProducts[currentSlide]?.banner_image)"
          alt="banner image"
          class="w-full h-full object-cover rounded-lg"
          height="100%"
          width="100%"
          @error="(e) => console.log('Banner image error:', e.target.src, e)"
          @load="(e) => console.log('Banner image loaded:', e.target.src)"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
      </div>

      <!-- Slides -->
      <div class="relative h-full overflow-hidden rounded-lg shadow-lg z-10">
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
                  @error="(e) => console.log('Product image error:', e.target.src)"
                  @load="(e) => console.log('Product image loaded:', e.target.src)"
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
                  class="flex items-center justify-center gap-4 md:mb-4 mb-3"
                >
                  <span
                    class="bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold"
                  >
                    {{ featuredProducts[idx].discount_percentage }}% OFF
                  </span>
                </div>
                <div class="w-full flex justify-center items-center mb-2">
                  <Button
                    text="Shop Now"
                    color="white"
                    size="md"
                    variant="solid"
                    icon="shopping-cart"
                    @click="() => router.push(`/products/${featuredProducts[idx].id}`)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav Arrows -->
      <button
        @click="goToPrevious"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors w-10 h-10 flex justify-center items-center z-30"
        aria-label="Previous slide"
        :disabled="isAnimating"
      >
        <IconChevronLeft class="w-4 h-4 text-white" />
      </button>
      <button
        @click="goToNext"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors w-10 h-10 flex justify-center items-center z-30"
        aria-label="Next slide"
        :disabled="isAnimating"
      >
        <IconChevronRight class="w-4 h-4 text-white" />
      </button>

      <!-- Dots -->
      <div
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30"
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
