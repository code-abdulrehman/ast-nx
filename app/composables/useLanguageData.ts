import type { LanguageData } from '../../server/api/languages/types'

export const useLanguageData = () => {
  const { locale } = useI18n()
  
  // Fetch language-specific data from API
  const { data: languageData, pending, error, refresh } = useFetch<LanguageData>('/api/data', {
    query: computed(() => ({ lang: locale.value || 'en' })),
    key: computed(() => `language-data-${locale.value || 'en'}`),
    default: () => ({} as LanguageData)
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
    
    // State
    pending: readonly(pending),
    error: readonly(error),
    
    // Methods
    t,
    getSection,
    refresh
  }
}
