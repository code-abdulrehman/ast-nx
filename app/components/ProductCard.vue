<script setup>
import { computed } from "vue";
import { useQuickData } from '~/composables/useLanguageSnippets'
import { usePriceCalculator } from '~/composables/usePriceCalculator'

// Get current locale for URL preservation
const { locale } = useI18n()

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Destructure product fields
const {
  product_id,
  title,
  product_feature_img,
  product_images,
  original_price,
  discount_percentage,
  ratings,
  mood
} = props.product;

// Language data
const { off, reviews } = useQuickData()

// Price calculator
const { getPriceBreakdown, formatPriceDisplay } = usePriceCalculator()

// Calculate prices
const priceBreakdown = computed(() => {
  if (original_price && discount_percentage !== undefined) {
    return getPriceBreakdown(original_price, discount_percentage)
  }
  return null
})

// Generate localized product URL
const productUrl = computed(() => {
  const baseUrl = `/product/${product_id}`
  // If locale is 'en' (default), don't add prefix
  if (locale.value === 'en') {
    return baseUrl
  }
  // For other locales, add the locale prefix
  return `/${locale.value}${baseUrl}`
})


// Handle image loading errors
const handleImageError = (event) => {
  console.warn('ProductCard image failed to load:', event.target.src)
  
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
</script>

<template>
  <RouterLink :to="productUrl" class="block" aria-label="ast-product-opening">
    <div
      class="relative flex flex-col bg-white overflow-hidden rounded-lg hover:shadow-md group"
    >
      <!-- Product Image -->
      <div class="relative mx-3 mt-3 flex h-60 justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-400 to-gray-600">
        <!-- Blurry background for feature image -->
        <img
          v-if="product_feature_img && !product_images[0]?.includes('/ast/products/posts/')"
          :src="product_feature_img"
          :alt="title"
          class="absolute inset-0 w-full h-full object-cover filter blur-[14px] scale-110"
          loading="lazy"
          @error="handleImageError"
        />

        <!-- Main product image -->
        <img
          :src="product_images[0]?.includes('/ast/products/posts/') ? product_images[0] : product_feature_img"
          :alt="title"
          class="relative z-10 object-cover transition-all ease-linear duration-300 scale-95"
          :style="{
            maxHeight: '100%',
            maxWidth: '100%',
            minHeight: '100px',
            minWidth: '180px',
            objectFit: 'cover',
            width: product_images[0]?.includes('/ast/products/posts/') ? '100%' : '180px',
            borderRadius: product_images[0]?.includes('/ast/products/posts/') ? '4px' : '0',
            position: 'relative',
            scale: product_images[0]?.includes('/ast/products/posts/') ? '1.1' : '1',
            top: product_images[0]?.includes('/ast/products/posts/') ? '-1px' : '0'
          }"
          loading="lazy"
          @error="handleImageError"
        />

        <!-- Discount Badge -->
        <span
          class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white z-20"
        >
          {{ discount_percentage }}% {{ off }}
        </span>

        <!-- Mood Badge -->
        <span
          v-if="mood === 'Gaming'"
          class="absolute top-0 right-0 m-2 rounded-full px-2 text-xs font-medium text-white z-20 flex justify-center items-center gap-1"
          :class="mood === 'Gaming' ? 'bg-primary' : 'bg-gray-600'"
        >
        <IconGamePad v-if="mood === 'Gaming'" class="text-white w-5 h-5" />
          {{ mood }}
        </span>
      </div>

      <!-- Content -->
      <div class="mt-4 px-5 pb-5">
        <!-- Title -->
        <h2
          class="title text-xl tracking-tight text-slate-900 truncate"
          :title="title"
        >
          {{ title }}
        </h2>

        <!-- Price + Ratings -->
        <div class="mt-2 flex items-center justify-between">
          <!-- Price -->
          <div v-if="priceBreakdown">
            <span class="text-xl lg:text-2xl text-primary">{{ formatPriceDisplay(priceBreakdown.discounted) }}</span>
            <span class="text-xs lg:text-sm text-slate-700 line-through ml-1">
              {{ formatPriceDisplay(priceBreakdown.original) }}
            </span>
          </div>
          <div v-else>
            <span class="text-xl lg:text-2xl text-primary">Price N/A</span>
          </div>

          <!-- Ratings -->
          <div class="flex items-center gap-1">
            <div class="flex">
              <svg
                key="idx"
                aria-hidden="true"
                :class="['h-5 w-5 text-yellow-300']"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 
                     0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
                     0 1.371 1.24.588 1.81l-2.8 2.034a1 1 
                     0 00-.364 1.118l1.07 3.292c.3.921-.755 
                     1.688-1.54 1.118l-2.8-2.034a1 1 
                     0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                     1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                     1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <span
              class="rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
              >{{ ratings }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.title {
  max-width: 100%;
}
</style>
