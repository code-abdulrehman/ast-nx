import type { SupportedLanguage } from '~/server/api/languages/types'

// Product interface
export interface Product {
  product_id: number
  title: string
  description: string
  discount_price: number
  current_price: number
  discount_percentage: number
  product_feature_img: string
  banner_image?: string
  product_images: string[]
  product_stock: number
  reviews: number
  ratings: number
  product_colors: string[]
  category: string
  series: string
  mood: string
  keywords: string[]
  made_country: string
  creation_date: string
  featured?: boolean
  shipping?: boolean
  specs: Record<string, string>
}

// Products API response interface
export interface ProductsResponse {
  products: Product[]
  total: number
  language: string
}

export const useProducts = () => {
  const { locale } = useI18n()
  
  // Fetch all products
  const { data: allProducts, pending: allPending, error: allError, refresh: refreshAll } = useFetch<ProductsResponse>('/api/products', {
    query: computed(() => ({ lang: locale.value || 'en' })),
    key: computed(() => `all-products-${locale.value || 'en'}`),
    default: () => ({ products: [], total: 0, language: 'en' })
  })
  
  // Fetch featured products
  const { data: featuredProducts, pending: featuredPending, error: featuredError, refresh: refreshFeatured } = useFetch<ProductsResponse>('/api/products', {
    query: computed(() => ({ lang: locale.value || 'en', featured: 'true' })),
    key: computed(() => `featured-products-${locale.value || 'en'}`),
    default: () => ({ products: [], total: 0, language: 'en' })
  })
  
  // Fetch gaming products
  const { data: gamingProducts, pending: gamingPending, error: gamingError, refresh: refreshGaming } = useFetch<ProductsResponse>('/api/products', {
    query: computed(() => ({ lang: locale.value || 'en', gaming: 'true' })),
    key: computed(() => `gaming-products-${locale.value || 'en'}`),
    default: () => ({ products: [], total: 0, language: 'en' })
  })
  
  // Search products
  const searchProducts = async (searchTerm: string, limit?: number) => {
    const { data } = await $fetch<ProductsResponse>('/api/products', {
      query: {
        lang: locale.value || 'en',
        search: searchTerm,
        ...(limit && { limit: limit.toString() })
      }
    })
    return data
  }
  
  // Get product by ID
  const getProductById = async (productId: number) => {
    const { data } = await $fetch<ProductsResponse>('/api/products', {
      query: {
        lang: locale.value || 'en'
      }
    })
    return data.products.find(product => product.product_id === productId)
  }
  
  // Computed properties for easy access
  const products = computed(() => allProducts.value?.products || [])
  const featured = computed(() => featuredProducts.value?.products || [])
  const gaming = computed(() => gamingProducts.value?.products || [])
  
  // Loading states
  const isLoading = computed(() => allPending.value || featuredPending.value || gamingPending.value)
  
  // Error states
  const hasError = computed(() => allError.value || featuredError.value || gamingError.value)
  
  // Refresh all data
  const refresh = async () => {
    await Promise.all([
      refreshAll(),
      refreshFeatured(),
      refreshGaming()
    ])
  }
  
  return {
    // Data
    products,
    featured,
    gaming,
    allProducts,
    featuredProducts,
    gamingProducts,
    
    // State
    isLoading,
    hasError,
    allPending,
    featuredPending,
    gamingPending,
    allError,
    featuredError,
    gamingError,
    
    // Methods
    searchProducts,
    getProductById,
    refresh,
    refreshAll,
    refreshFeatured,
    refreshGaming
  }
}
