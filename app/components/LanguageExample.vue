<template>
  <div class="p-6 bg-gray-50 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Language Data Examples</h2>
    
    <!-- Method 1: Using the main composable -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Method 1: Main Composable</h3>
      <p><strong>Logo:</strong> {{ t('header.logo.text') }}</p>
      <p><strong>Description:</strong> {{ t('header.logo.description') }}</p>
    </div>
    
    <!-- Method 2: Using quick data shortcuts -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Method 2: Quick Data Shortcuts</h3>
      <p><strong>Logo:</strong> {{ logoText }}</p>
      <p><strong>Services Title:</strong> {{ servicesTitle }}</p>
      <p><strong>Trusted Title:</strong> {{ trustedTitle }}</p>
    </div>
    
    <!-- Method 3: Using language text computed -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Method 3: Language Text Computed</h3>
      <p><strong>Search Placeholder:</strong> {{ searchPlaceholder }}</p>
      <p><strong>Copyright:</strong> {{ copyrightText }}</p>
    </div>
    
    <!-- Method 4: Using section data -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Method 4: Section Data</h3>
      <p><strong>Navigation Store:</strong> {{ headerSection.navigation?.store }}</p>
      <p><strong>Navigation Home:</strong> {{ headerSection.navigation?.home }}</p>
    </div>
    
    <!-- Language Switcher -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Language Switcher</h3>
      <div class="flex gap-2">
        <button 
          v-for="lang in availableLanguages" 
          :key="lang.key"
          @click="switchLanguage(lang.key)"
          :class="[
            'px-3 py-1 rounded text-sm',
            currentLanguage.key === lang.key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ lang.flag }} {{ lang.label }}
        </button>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        Current: {{ currentLanguage.flag }} {{ currentLanguage.label }}
      </p>
    </div>
    
    <!-- Services List -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Services List</h3>
      <div class="grid grid-cols-2 gap-4">
        <div 
          v-for="service in servicesItems" 
          :key="service.icon"
          class="p-3 bg-white rounded border"
        >
          <h4 class="font-medium">{{ service.title }}</h4>
          <p class="text-sm text-gray-600">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import all the utility composables
import { 
  useSimpleTranslation, 
  useSectionData, 
  useLanguageText, 
  useLanguageSwitcher, 
  useQuickData 
} from '~/composables/useLanguageSnippets'

// Method 1: Simple translation function
const t = useSimpleTranslation()

// Method 2: Quick data shortcuts
const { 
  logoText, 
  servicesTitle, 
  trustedTitle, 
  searchPlaceholder, 
  copyrightText,
  servicesItems 
} = useQuickData()

// Method 3: Language text computed
const searchPlaceholderComputed = useLanguageText('header.search.placeholder', 'Search...')
const copyrightTextComputed = useLanguageText('footer.copyright.text', 'All Rights Reserved')

// Method 4: Section data
const headerSection = useSectionData('header')

// Language switcher
const { availableLanguages, currentLanguage, switchLanguage } = useLanguageSwitcher()
</script>
