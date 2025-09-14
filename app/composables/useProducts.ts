
import { useI18n } from '#imports'
import enProducts from '../../server/data/products/en.json'
import arProducts from '../../server/data/products/ar.json'
import urProducts from '../../server/data/products/ur.json'

// Product interface
export interface Product {
  product_id: number
  title: string
  description: string
  original_price: number
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

// Language-specific product data
const productDataMap: Record<string, Product[]> = {
  en: enProducts as unknown as Product[],
  ar: arProducts as unknown as Product[],
  ur: urProducts as unknown as Product[],
}

export const useProducts = () => {
  const { locale } = useI18n()

  // Get products data for specific language
  const getProductsData = (lang: string) => {
    return productDataMap[lang] || productDataMap.en
  }

  // Use immediate data - no API calls for instant loading
  const allProductsData = ref({
    products: getProductsData(locale.value || 'en'),
    total: 4,
    language: locale.value || 'en'
  })
  
  const allPending = ref(false)
  const allError = ref(null)
  
  // No separate API calls - we'll filter on client side
  
  // Search products - instant since data is local
  const searchProducts = async (searchTerm: string, limit?: number) => {
    const allProducts = allProductsData.value?.products || []
    const searchTermLower = searchTerm.toLowerCase()
    
    const filteredProducts = allProducts.filter(product => {
      const searchableText = [
        product.title,
        product.description,
        product.category,
        ...product.keywords
      ].join(' ').toLowerCase()
      
      return searchableText.includes(searchTermLower)
    })
    
    const limitedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts
    
    return {
      products: limitedProducts,
      total: limitedProducts.length,
      language: locale.value || 'en'
    }
  }
  
  // Get product by ID - instant since data is local
  const getProductById = async (productId: number) => {
    const product = allProductsData.value?.products?.find(p => p.product_id === productId)
    
    if (product) {
      return product
    }
    
    // Return a fallback product if not found
    return {
      product_id: productId,
      title: 'Product Not Found',
      description: 'This product could not be loaded',
      discount_price: 0,
      current_price: 0,
      discount_percentage: 0,
      product_feature_img: '',
      product_images: [],
      product_stock: 0,
      reviews: 0,
      ratings: 0,
      product_colors: [],
      category: 'Unknown',
      series: 'Unknown',
      mood: 'Normal',
      keywords: [],
      made_country: 'Unknown',
      creation_date: new Date().toISOString(),
      specs: {}
    }
  }
  

  // Computed properties for easy access - always available since data is local
  const products = computed(() => {
    return allProductsData.value?.products || []
  })
  
  const featured = computed(() => {
    const allProducts = products.value
    return allProducts.filter(p => p.featured === true)
  })
  
  const gaming = computed(() => {
    const allProducts = products.value
    return allProducts.filter(p => p.mood === 'Gaming')
  })
  
  // Loading states - always false since data is local
  const isLoading = computed(() => false)
  
  // Error states - always false since data is local
  const hasError = computed(() => false)
  
  // Refresh function - instant since data is local
  const refresh = async () => {
    // Update data with current locale
    allProductsData.value = {
      products: getProductsData(locale.value || 'en'),
      total: 4,
      language: locale.value || 'en'
    }
  }
  
  const refreshAll = refresh
  
  return {
    // Data
    products,
    featured,
    gaming,
    allProducts: allProductsData,
    
    // State
    isLoading,
    hasError,
    allPending,
    allError,
    
    // Methods
    searchProducts,
    getProductById,
    refresh,
    refreshAll
  }
}
