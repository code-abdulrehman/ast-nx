<template>
  <div class="relative">
    <!-- Language Switcher Button -->
    <button
      aria-label="ast-language-switch-button"
      @click="toggleDropdown"
      :disabled="isChangingLanguage"
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200"
      :class="[
        isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-primary',
        isChangingLanguage ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    >
      <IconTranslate class="w-4 h-4" :class="{ 'animate-spin': isChangingLanguage }" />
      <span class="hidden sm:inline">{{ currentLanguage?.name || 'English' }}</span>
      <IconChevronRight 
        class="w-3 h-3 transition-transform duration-200"
        :class="showDropdown ? 'rotate-90' : ''"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="showDropdown"
      class="absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-50"
      :class="dropdownPosition.right"
      :dir="textDirection"
    >
      <button
        aria-label="ast-language-switch-options"
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :disabled="isChangingLanguage"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
        :class="[
          lang.code === currentLocale ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-700',
          isChangingLanguage ? 'opacity-50 cursor-not-allowed' : '',
          textAlign
        ]"
      >
        <span class="text-lg">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
        <span v-if="lang.code === currentLocale" class="ml-auto">
          <IconBadgeCheck class="w-4 h-4" />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '#imports'

// Props
defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  }
})

// I18n
const { locale, setLocale } = useI18n()

// Direction utilities
const { textDirection, textAlign, dropdownPosition } = useDirection(locale)

// State
const showDropdown = ref(false)
const currentLocale = computed(() => locale.value || 'en')
const isChangingLanguage = ref(false)
let languageChangeTimeout: NodeJS.Timeout | null = null

// Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLocale.value) || languages[0]
})

// Methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const changeLanguage = async (langCode: string) => {
  // Prevent rapid successive language changes
  if (isChangingLanguage.value || langCode === currentLocale.value) {
    return
  }
  
  isChangingLanguage.value = true
  showDropdown.value = false
  
  // Clear any pending language change
  if (languageChangeTimeout) {
    clearTimeout(languageChangeTimeout)
  }
  
  // Debounce the language change by 300ms
  languageChangeTimeout = setTimeout(async () => {
    try {
      await setLocale(langCode)
      // Store preference in localStorage
      localStorage.setItem('preferred-language', langCode)
    } catch (error) {
      console.error('Error changing language:', error)
    } finally {
      isChangingLanguage.value = false
    }
  }, 300)
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  // Load saved language preference
  const savedLang = localStorage.getItem('preferred-language')
  if (savedLang && languages.some(lang => lang.code === savedLang)) {
    setLocale(savedLang)
  }
  
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
