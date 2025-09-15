import type { LanguageData } from '../../server/api/languages/types'

// Import language data directly
import enData from '../../server/api/languages/en.json'
import arData from '../../server/api/languages/ar.json'
import urData from '../../server/api/languages/ur.json'

const languageDataMap: Record<string, LanguageData> = {
  en: enData,
  ar: arData,
  ur: urData,
}

export const useLanguageData = () => {
  const { locale } = useI18n()
  
  // Get language data directly from imported files - no API calls
  const languageData = computed(() => {
    return languageDataMap[locale.value || 'en'] || languageDataMap.en
  })

  // Simple translation function for flat data structure
  const t = (path: string, fallback?: string): string => {
    if (!languageData.value) {
      return fallback || path
    }
    
    const keys = path.split('.')
    let value: any = languageData.value
    
    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) break
    }
    
    return value || fallback || path
  }

  // Get specific section data
  const getSection = (section: keyof LanguageData) => {
    return computed(() => languageData.value?.[section] || {})
  }

  // Get header data
  const headerData = computed(() => languageData.value?.header || {})
  
  // Get footer data  
  const footerData = computed(() => languageData.value?.footer || {})
  
  // Get services data
  const servicesData = computed(() => languageData.value?.services || {})
  
  // Get trusted data
  const trustedData = computed(() => languageData.value?.trusted || {})
  
  // Get products data
  const productsData = computed(() => languageData.value?.products || {})

  return {
    // Data
    languageData: readonly(languageData),
    headerData,
    footerData, 
    servicesData,
    trustedData,
    productsData,
    
    // State - always false since data is local
    pending: ref(false),
    error: ref(null),
    
    // Methods
    t,
    getSection,
    refresh: () => {} // No-op since data is local
  }
}
