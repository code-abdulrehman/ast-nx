// Reusable code snippets for language data handling

import type { SupportedLanguage } from '../../server/api/languages/types'

/**
 * Simple translation function for any component
 * Usage: const t = useSimpleTranslation()
 */
export const useSimpleTranslation = () => {
  const { t } = useLanguageData()
  return t
}

/**
 * Get specific section data with type safety
 * Usage: const header = useSectionData('header')
 */
export const useSectionData = <T extends 'header' | 'footer' | 'services' | 'trusted' | 'products'>(section: T) => {
  const { getSection } = useLanguageData()
  return getSection(section)
}

/**
 * Language-aware computed properties
 * Usage: const title = useLanguageText('header.logo.text')
 */
export const useLanguageText = (path: string, fallback?: string) => {
  const { t } = useLanguageData()
  return computed(() => t(path, fallback))
}

/**
 * Get all available languages
 */
export const useAvailableLanguages = () => {
  return [
    { key: 'en', label: 'English', flag: '🇺🇸' },
    { key: 'ur', label: 'اردو', flag: '🇵🇰' },
    { key: 'ar', label: 'العربية', flag: '🇸🇦' }
  ]
}

/**
 * Language switching utility
 */
export const useLanguageSwitcher = () => {
  const { locale } = useI18n()
  const availableLanguages = useAvailableLanguages()

  const switchLanguage = (lang: SupportedLanguage) => {
    locale.value = lang
  }

  const currentLanguage = computed(() =>
    availableLanguages.find(l => l.key === locale.value) || availableLanguages[0]
  )
  
  return {
    availableLanguages,
    currentLanguage,
    switchLanguage
  }
}

/**
 * Quick access to common data sections
 */
export const useQuickData = () => {
  const { headerData, footerData, servicesData, trustedData, productsData } = useLanguageData()
  
  return {
    // Header shortcuts
    logoText: computed(() => headerData.value?.logo?.text || ''),
    logoDescription: computed(() => headerData.value?.logo?.description || ''),
    searchPlaceholder: computed(() => headerData.value?.search?.placeholder || ''),
    searchButton: computed(() => headerData.value?.search?.button || ''),
    navStore: computed(() => headerData.value?.navigation?.store || ''),
    navHome: computed(() => headerData.value?.navigation?.home || ''),
    
    // Footer shortcuts
    socialTitle: computed(() => footerData.value?.social?.title || ''),
    socialIcons: computed(() => footerData.value?.social?.icons || []),
    copyrightText: computed(() => footerData.value?.copyright?.text || ''),
    copyrightCompany: computed(() => footerData.value?.copyright?.company || ''),
    
    // Services shortcuts
    servicesTitle: computed(() => servicesData.value?.title || ''),
    servicesItems: computed(() => servicesData.value?.items || []),
    
    // Trusted shortcuts
    trustedTitle: computed(() => trustedData.value?.title || ''),
    
    // Products shortcuts
    featuredProducts: computed(() => productsData.value?.featured || ''),
    gamingProducts: computed(() => productsData.value?.gaming || ''),
    gamingDescription: computed(() => productsData.value?.gamingDescription || ''),
    allProducts: computed(() => productsData.value?.allProducts || ''),
    back: computed(() => productsData.value?.back || ''),
    onSale: computed(() => productsData.value?.onSale || ''),
    endingIn: computed(() => productsData.value?.endingIn || ''),
    offerExpired: computed(() => productsData.value?.offerExpired || ''),
    endow: computed(() => productsData.value?.endow || ''),
    latestProducts: computed(() => productsData.value?.latest || ''),
    viewAllProducts: computed(() => productsData.value?.viewAll || ''),
    searchResults: computed(() => productsData.value?.searchResults || ''),
    results: computed(() => productsData.value?.results || ''),
    found: computed(() => productsData.value?.found || ''),
    noProducts: computed(() => productsData.value?.noProducts || ''),
    trySearching: computed(() => productsData.value?.trySearching || ''),
    backToProducts: computed(() => productsData.value?.backToProducts || ''),
    reviews: computed(() => productsData.value?.reviews || ''),
    off: computed(() => productsData.value?.off || ''),
    productInfo: computed(() => productsData.value?.productInfo || ''),
    specifications: computed(() => productsData.value?.specifications || ''),
    stock: computed(() => productsData.value?.stock || ''),
    available: computed(() => productsData.value?.available || ''),
    category: computed(() => productsData.value?.category || ''),
    country: computed(() => productsData.value?.country || ''),
    sku: computed(() => productsData.value?.sku || ''),
    tags: computed(() => productsData.value?.tags || '')
  }
}
