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
 * Quick access to common data sections - using language files for instant loading
 */
export const useQuickData = () => {
  const { headerData, footerData, servicesData, trustedData, productsData } = useLanguageData()
  
  return {
    // Header shortcuts
    logoText: computed(() => (headerData.value as any)?.logo?.text || ''),
    logoDescription: computed(() => (headerData.value as any)?.logo?.description || ''),
    searchPlaceholder: computed(() => (headerData.value as any)?.search?.placeholder || ''),
    searchButton: computed(() => (headerData.value as any)?.search?.button || ''),
    navStore: computed(() => (headerData.value as any)?.navigation?.store || ''),
    navHome: computed(() => (headerData.value as any)?.navigation?.home || ''),
    
    // Footer shortcuts
    socialTitle: computed(() => (footerData.value as any)?.social?.title || ''),
    socialIcons: computed(() => (footerData.value as any)?.social?.icons || []),
    copyrightText: computed(() => (footerData.value as any)?.copyright?.text || ''),
    copyrightCompany: computed(() => (footerData.value as any)?.copyright?.company || ''),
    
    // Services shortcuts
    servicesTitle: computed(() => (servicesData.value as any)?.title || ''),
    servicesItems: computed(() => (servicesData.value as any)?.items || []),
    
    // Trusted shortcuts
    trustedTitle: computed(() => (trustedData.value as any)?.title || ''),
    
    // Products shortcuts
    featuredProducts: computed(() => (productsData.value as any)?.featured || ''),
    gamingProducts: computed(() => (productsData.value as any)?.gaming || ''),
    gamingDescription: computed(() => (productsData.value as any)?.gamingDescription || ''),
    allProducts: computed(() => (productsData.value as any)?.allProducts || ''),
    back: computed(() => (productsData.value as any)?.back || ''),
    onSale: computed(() => (productsData.value as any)?.onSale || ''),
    endingIn: computed(() => (productsData.value as any)?.endingIn || ''),
    offerExpired: computed(() => (productsData.value as any)?.offerExpired || ''),
    endow: computed(() => (productsData.value as any)?.endow || ''),
    latestProducts: computed(() => (productsData.value as any)?.latest || ''),
    viewAllProducts: computed(() => (productsData.value as any)?.viewAll || ''),
    searchResults: computed(() => (productsData.value as any)?.searchResults || ''),
    results: computed(() => (productsData.value as any)?.results || ''),
    found: computed(() => (productsData.value as any)?.found || ''),
    noProducts: computed(() => (productsData.value as any)?.noProducts || ''),
    trySearching: computed(() => (productsData.value as any)?.trySearching || ''),
    backToProducts: computed(() => (productsData.value as any)?.backToProducts || ''),
    reviews: computed(() => (productsData.value as any)?.reviews || ''),
    off: computed(() => (productsData.value as any)?.off || ''),
    productInfo: computed(() => (productsData.value as any)?.productInfo || ''),
    specifications: computed(() => (productsData.value as any)?.specifications || ''),
    stock: computed(() => (productsData.value as any)?.stock || ''),
    available: computed(() => (productsData.value as any)?.available || ''),
    category: computed(() => (productsData.value as any)?.category || ''),
    country: computed(() => (productsData.value as any)?.country || ''),
    sku: computed(() => (productsData.value as any)?.sku || ''),
    tags: computed(() => (productsData.value as any)?.tags || '')
  }
}
