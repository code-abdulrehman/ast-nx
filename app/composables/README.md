# Language Data Composables

This directory contains reusable composables for handling language data in your Vue components.

## Main Composable: `useLanguageData`

The primary composable that handles all language data fetching and management.

```vue
<script setup>
import { useLanguageData } from '~/composables/useLanguageData'

const { 
  languageData,    // Full language data object
  headerData,      // Header section data
  footerData,      // Footer section data
  servicesData,    // Services section data
  trustedData,     // Trusted section data
  t,              // Translation function
  pending,        // Loading state
  error,          // Error state
  refresh         // Refresh function
} = useLanguageData()
</script>
```

## Utility Composables: `useLanguageSnippets`

### 1. Simple Translation Function

```vue
<script setup>
import { useSimpleTranslation } from '~/composables/useLanguageSnippets'

const t = useSimpleTranslation()

// Usage in template
// {{ t('header.logo.text') }}
// {{ t('services.title') }}
</script>
```

### 2. Section Data Access

```vue
<script setup>
import { useSectionData } from '~/composables/useLanguageSnippets'

const headerSection = useSectionData('header')
const footerSection = useSectionData('footer')

// Access nested properties
// {{ headerSection.logo?.text }}
// {{ footerSection.social?.title }}
</script>
```

### 3. Language Text Computed

```vue
<script setup>
import { useLanguageText } from '~/composables/useLanguageSnippets'

const title = useLanguageText('header.logo.text', 'Default Title')
const description = useLanguageText('header.logo.description', 'Default Description')

// Usage in template
// {{ title }}
// {{ description }}
</script>
```

### 4. Quick Data Shortcuts

```vue
<script setup>
import { useQuickData } from '~/composables/useLanguageSnippets'

const {
  logoText,           // header.logo.text
  logoDescription,    // header.logo.description
  searchPlaceholder,  // header.search.placeholder
  searchButton,       // header.search.button
  navStore,          // header.navigation.store
  navHome,           // header.navigation.home
  socialTitle,       // footer.social.title
  socialIcons,       // footer.social.icons
  copyrightText,     // footer.copyright.text
  copyrightCompany,  // footer.copyright.company
  servicesTitle,     // services.title
  servicesItems,     // services.items
  trustedTitle       // trusted.title
} = useQuickData()
</script>
```

### 5. Language Switcher

```vue
<script setup>
import { useLanguageSwitcher } from '~/composables/useLanguageSnippets'

const { 
  availableLanguages,  // Array of available languages
  currentLanguage,     // Current language object
  switchLanguage       // Function to switch language
} = useLanguageSwitcher()

// Switch language
const changeLanguage = (lang) => {
  switchLanguage(lang)
}
</script>

<template>
  <select @change="changeLanguage($event.target.value)">
    <option 
      v-for="lang in availableLanguages" 
      :key="lang.key" 
      :value="lang.key"
      :selected="lang.key === currentLanguage.key"
    >
      {{ lang.flag }} {{ lang.label }}
    </option>
  </select>
</template>
```

## Complete Example Component

```vue
<template>
  <div>
    <!-- Using translation function -->
    <h1>{{ t('header.logo.text') }}</h1>
    <p>{{ t('header.logo.description') }}</p>
    
    <!-- Using quick shortcuts -->
    <h2>{{ servicesTitle }}</h2>
    <ul>
      <li v-for="service in servicesItems" :key="service.icon">
        {{ service.title }} - {{ service.description }}
      </li>
    </ul>
    
    <!-- Language switcher -->
    <div>
      <button 
        v-for="lang in availableLanguages" 
        :key="lang.key"
        @click="switchLanguage(lang.key)"
        :class="{ active: lang.key === currentLanguage.key }"
      >
        {{ lang.flag }} {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  useSimpleTranslation, 
  useQuickData, 
  useLanguageSwitcher 
} from '~/composables/useLanguageSnippets'

const t = useSimpleTranslation()
const { servicesTitle, servicesItems } = useQuickData()
const { availableLanguages, currentLanguage, switchLanguage } = useLanguageSwitcher()
</script>
```

## Best Practices

1. **Use the main composable** for complex components that need full control
2. **Use quick shortcuts** for simple components that only need specific data
3. **Use translation function** for dynamic content or computed properties
4. **Use section data** when you need type safety for specific sections
5. **Always provide fallbacks** for translation functions

## Adding New Languages

When you add a new language:

1. Create the language file in `/server/api/languages/{lang}.json`
2. Update the `SupportedLanguage` type in `/server/api/languages/types.ts`
3. Add the language to `supportedLanguages` array in `/server/api/data.ts`
4. Add the language to `useAvailableLanguages()` in `useLanguageSnippets.ts`
5. Import and add to `languageData` object in `/server/api/data.ts`

## Error Handling

All composables include error handling:

```vue
<script setup>
const { error, pending } = useLanguageData()

// Check for errors
if (error.value) {
  console.error('Failed to load language data:', error.value)
}

// Show loading state
if (pending.value) {
  // Show loading spinner
}
</script>
```
