<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, watchEffect } from 'vue'
import { useRoute, useRouter, useI18n } from '#imports' // Nuxt composables

// Props
defineProps({
  logoText: {
    type: String,
    default: ''
  }
})

// I18n
const { locale } = useI18n()

// Use language data from imported files - instant loading
const { headerData, t, pending, error } = useLanguageData()

// Direction utilities
const {
  textDirection,
  textAlign,
  isRTL,
  inputPadding,
  iconPosition,
  buttonPosition,
  iconRotation
} = useDirection(locale)

// State
const searchQuery = ref('')
const isScrolled = ref(false)
const showMobileSearch = ref(false)

const route = useRoute()
const router = useRouter()

// Sync search bar with URL parameters
watch(
  () => route.query.search,
  (newQuery) => {
    searchQuery.value = Array.isArray(newQuery) ? newQuery[0] || '' : newQuery || ''
  },
  { immediate: true }
)

// Handle scroll effect for glass morphism
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Methods
const handleSearch = (e: Event) => {
  e.preventDefault()
  showMobileSearch.value = false
  const trimmedQuery = searchQuery.value.trim()

  if (trimmedQuery) {
    if (route.path.startsWith('/product/')) {
      router.push({ path: route.path, query: { search: trimmedQuery } })
    } else {
      router.push({ path: '/', query: { search: trimmedQuery } }).then(() => {
        setTimeout(() => {
          const storeSection = document.getElementById('store')
          if (storeSection) {
            storeSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      })
    }
  } else {
    router.push('/')
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  router.push('/')
}

// SEO Meta tags and direction
useHead({
  title: computed(() => t('meta.title')),
  htmlAttrs: {
    dir: textDirection,
    lang: computed(() => locale.value || 'en')
  },
  meta: [
    {
      name: 'description',
      content: computed(() => t('meta.description'))
    },
    {
      name: 'keywords',
      content: computed(() => t('meta.keywords'))
    }
  ]
})

// Global direction management
watchEffect(() => {
  if (typeof window !== 'undefined') {
    const html = document.documentElement
    const body = document.body
    
    // Set HTML attributes
    html.setAttribute('dir', textDirection.value)
    html.setAttribute('lang', locale.value || 'en')
    
    // Add direction class to body for global CSS targeting
    body.classList.remove('rtl', 'ltr')
    body.classList.add(textDirection.value)
    
    // Add language class for specific language styling
    const currentLang = locale.value || 'en'
    body.classList.remove('lang-en', 'lang-ar', 'lang-ur', 'lang-he', 'lang-fa', 'lang-ku')
    body.classList.add(`lang-${currentLang}`)
  }
})
</script>

<template>
  <!-- Main header - no loading states since data is hardcoded -->
  <header
    id="/"
    class="w-full transition-all duration-200"
    :class="[
      isScrolled
        ? 'bg-primary text-white backdrop-blur-xl shadow-lg py-1'
        : 'bg-gray-100 backdrop-blur-md py-2',
      textAlign
    ]"
    :dir="textDirection"
    style="position: sticky; top: 0; z-index: 50; width: 100%;"
  >
  
    <nav class="container mx-auto flex flex-row justify-between gap-6 px-4 flex-wrap items-center" :dir="textDirection">
      <!-- Logo -->
      <ul class="col-span-1 flex items-center w-auto">
        <li>
          <Logo
            :text="logoText || t((headerData as any)?.logo?.text || 'logo.text')"
            :class="isScrolled ? 'text-white hover:text-gray-100 h-auto' : 'text-gray-800 hover:text-gray-700 h-auto'"
            :fill="isScrolled ? 'white' : 'black'"
          />
        </li>
      </ul>

      <!-- Search Bar (Desktop) -->
      <div class=" max-w-xl md:max-w-3xl mx-auto flex-1 hidden md:block">
        <form @submit="handleSearch" class="relative">
          <input
            id="search"
            type="text"
            :placeholder="t((headerData as any)?.search?.placeholder || 'search.placeholder')"
            v-model="searchQuery"
            class="w-full px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            :class="[
              isScrolled
                ? 'bg-white backdrop-blur-sm border-1 border-gray-100/40 text-xs'
                : 'bg-white border border-gray-100 text-sm',
              searchQuery ? inputPadding.withButton : inputPadding.withIcon
            ]"
            :dir="textDirection"
          />
          <div 
            class="absolute inset-y-0 flex items-center"
            :class="iconPosition.left"
          >
            <IconSearch class="text-gray-400 w-4 h-4" />
          </div>

          <!-- Clear button -->
          <button
            aria-label="search-input-clear-button"
            v-if="searchQuery"
            type="button"
            @click="clearSearch"
            class="absolute inset-y-0 flex items-center text-gray-400 hover:text-red-500 transition-colors"
            :class="isRTL ? 'left-8 pl-3' : 'right-8 pr-3'"
          >
            <IconXmark class="w-4 h-4" />
          </button>

          <!-- Search button -->
          <button
            aria-label="ast-search-button"
            type="submit"
            class="absolute inset-y-0 flex items-center"
            :class="[
              isScrolled
                ? 'bg-primary text-white hover:text-gray-200 backdrop-blur-sm border-2 border-gray-100 text-md px-2'
                : 'bg-primary text-white hover:text-gray-200 border border-gray-100 text-md px-2',
              buttonPosition.left
            ]"
          >
          <IconArrowRight 
            class="w-4 h-4" 
            :class="iconRotation"
          />
          </button>
        </form>
      </div>
      <!-- Icons -->
      <div class="order-3 flex justify-end items-center gap-2">
        <!-- Language Switcher -->
        <LanguageSwitcher :is-scrolled="isScrolled" />

        <!-- Mobile Search Toggle -->
        <button
          aria-label="Open search"
          class="px-2 py-2 rounded-lg transition-colors duration-200 md:hidden"
          :class="isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-primary'"
          @click="showMobileSearch = true"
        >
         <IconSearch class="w-5 h-5" />
        </button>

        <!-- Store -->
        <NuxtLink to="#store" aria-label="ast-products-store-link">
          <button
            :aria-label="t((headerData as any)?.navigation?.store || 'navigation.store')"
            class="px-2 py-2 rounded-lg transition-colors duration-200"
            :class="isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-primary'"
          >
            <IconStore class="w-5 h-5" />
          </button>
        </NuxtLink>
      </div>
    </nav>

    <!-- Mobile Search -->
    <div
      v-if="showMobileSearch"
      class="md:hidden relative top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-lg shadow-lg px-4 py-3 flex items-center animate-fade-in-down"
      :dir="textDirection"
    >
      <form @submit="handleSearch" class="relative flex-1">
        <input
          type="text"
          :placeholder="t((headerData as any)?.search?.placeholder || 'search.placeholder')"
          v-model="searchQuery"
          autofocus
          class="w-full px-4 py-2 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white"
          :class="inputPadding.withIconAndButton"
          :dir="textDirection"
        />
        <div 
          class="absolute inset-y-0 flex items-center"
          :class="iconPosition.left"
        >
          <IconSearch class="text-gray-400 w-4 h-4" />
        </div>

        <!-- Clear button -->
        <button
          aria-label="ast-clear-seach-button"
          v-if="searchQuery"
          type="button"
          @click="clearSearch"
          class="absolute inset-y-0 flex items-center text-gray-400 hover:text-red-500 transition-colors"
          :class="isRTL ? 'left-12 pl-3' : 'right-12 pr-3'"
        >
        <IconXmark class="w-4 h-4" />
        </button>

        <!-- Search button -->
        <button 
          aria-label="ast-search-button"
          type="submit" 
          class="absolute inset-y-0 flex items-center text-gray-400 hover:text-primary"
          :class="iconPosition.right"
        >
          <IconArrowRight 
            class="w-4 h-4" 
            :class="[
              {'text-gray-400 text-md': isScrolled, 'text-gray-800 text-md': !isScrolled},
              iconRotation
            ]"
          />
        </button>
      </form>

      <!-- Close Button -->
      <button
        aria-label="Close search"
        class="ml-2 text-gray-500 hover:text-red-500 text-2xl"
        @click="showMobileSearch = false"
      >
      <IconXmark class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>
