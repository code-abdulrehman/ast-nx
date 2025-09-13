<template>
  <div class="relative">
    <!-- Language Switcher Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200"
      :class="isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-primary'"
    >
      <IconTranslate class="w-4 h-4" />
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
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
        :class="[
          lang.code === currentLocale ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-700',
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

const changeLanguage = (langCode: string) => {
  setLocale(langCode)
  showDropdown.value = false
  
  // Store preference in localStorage
  localStorage.setItem('preferred-language', langCode)
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
