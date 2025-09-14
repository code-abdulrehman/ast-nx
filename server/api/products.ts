import type { SupportedLanguage } from './languages/types'
import enProducts from '../data/products/en.json'
import arProducts from '../data/products/ar.json'
import urProducts from '../data/products/ur.json'

// Product data structure
interface Product {
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

// Language-specific product data
const productDataMap: Record<string, Product[]> = {
  en: enProducts as unknown as Product[],
  ar: arProducts as unknown as Product[],
  ur: urProducts as unknown as Product[],
}

// Get product data for specific language
const getProductData = (lang: string) => {
  return productDataMap[lang] || productDataMap.en
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const lang = (query.lang as string) || 'en'
    
    // No logging to reduce noise
    
    // Supported languages
    const supportedLanguages: SupportedLanguage[] = ['en', 'ur', 'ar']
    
    // Validate language parameter
    if (!supportedLanguages.includes(lang as SupportedLanguage)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Unsupported language: ${lang}. Supported languages: ${supportedLanguages.join(', ')}`
      })
    }

  // Get products data for the requested language
  const productsData = getProductData(lang)
  
  // Filter products based on query parameters
  let filteredProducts = [...productsData]
  
  // Filter by featured products
  if (query.featured === 'true') {
    filteredProducts = filteredProducts.filter(product => product.featured === true)
  }
  
  // Filter by gaming products
  if (query.gaming === 'true') {
    filteredProducts = filteredProducts.filter(product => product.mood === 'Gaming')
  }
  
  // Search functionality
  if (query.search) {
    const searchTerm = (query.search as string).toLowerCase()
    filteredProducts = filteredProducts.filter(product => {
      const searchableText = [
        product.title,
        product.description,
        product.category,
        ...product.keywords
      ].join(' ').toLowerCase()
      
      return searchableText.includes(searchTerm)
    })
  }
  
  // Limit results
  if (query.limit) {
    const limit = parseInt(query.limit as string)
      if (!isNaN(limit) && limit > 0) {
    filteredProducts = filteredProducts.slice(0, limit)
      }
  }

    const result = {
      products: filteredProducts,
      total: filteredProducts.length,
      language: lang
    }
    
    // No logging to reduce noise
    
    return result
  } catch (error: any) {
    // Return a proper error response without logging
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Internal server error while fetching products'
    })
  }
})
