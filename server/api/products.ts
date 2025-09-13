import type { SupportedLanguage } from './languages/types'

// Product data structure
interface Product {
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

// Sample products data (you can replace this with your actual data source)
const productsData: Product[] = [
  {
    product_id: 1,
    title: "AST-G1",
    description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
    discount_price: 2400,
    current_price: 3500,
    discount_percentage: 31,
    product_feature_img: "/ast/products/ast-g1.webp",
    banner_image: "/ast/banners/main-banner.webp",
    product_images: [
      "/ast/products/posts/ast-g1.webp",
      "/ast/products/posts-2/ast-g1.webp",
      "/ast/products/ast-g1.webp",
    ],
    product_stock: 150,
    reviews: 1247,
    ratings: 4.8,
    product_colors: ["Black", "White", "Gold"],
    category: "Electronics",
    series: "AST-G",
    mood: "Normal",
    keywords: ["wireless", "earbuds", "audio"],
    made_country: "China",
    creation_date: "2024-05-01",
    featured: true,
    specs: {
      wireless_version: "V5.4",
      wireless_range: ">10m",
      music_time: "4.5h (Volume 60%)",
      talk_time: "3.5h",
      frequency_response: "20 HZ - 20 KHZ",
      battery: "300mAh",
      cell_voltage: "5V",
      standby_time: "30 Days",
      cell_life: "500 Times",
      usb: "Type-C"
    }
  },
  {
    product_id: 2,
    title: "AST-G2",
    description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
    discount_price: 2100,
    current_price: 3200,
    discount_percentage: 34,
    product_feature_img: "/ast/products/ast-g2.webp",
    banner_image: "/ast/banners/main-banner.webp",
    product_images: [
      "/ast/products/ast-g2.webp",
      "/ast/products/ast-g2.webp",
      "/ast/products/ast-g2.webp",
    ],
    product_stock: 75,
    reviews: 92,
    ratings: 3.7,
    product_colors: ["Black"],
    category: "Electronics",
    series: "AST-G",
    mood: "Normal",
    keywords: ["wireless", "earbuds", "audio"],
    made_country: "China",
    creation_date: "2024-05-02",
    shipping: true,
    featured: true,
    specs: {
      wireless_version: "V5.0",
      wireless_range: ">10m",
      earbud_battery: "35mAh",
      music_time: "4.5 - 5.5h",
      frequency_response: "20 HZ - 20 KHZ",
      sensitivity: "93 ± 3dB",
      battery: "300mAh",
      cell_voltage: "3.7V",
      standby_time: "30 Days",
      cell_life: ">300 Times",
      usb: "Type-C"
    }
  },
  {
    product_id: 8,
    title: "AST-G8",
    description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
    discount_price: 2500,
    current_price: 4500,
    discount_percentage: 44,
    product_feature_img: "/ast/products/ast-g8.webp",
    banner_image: "/ast/banners/main-banner.webp",
    product_images: [
      "/ast/products/posts/ast-g8.webp",
      "/ast/products/posts-2/ast-g8.webp",
      "/ast/products/ast-g8.webp",
    ],
    product_stock: 100,
    reviews: 100,
    ratings: 4.5,
    product_colors: ["Black", "White"],
    category: "Electronics",
    series: "AST-G",
    mood: "Gaming",
    keywords: ["wireless", "earbuds", "audio"],
    made_country: "China",
    creation_date: "2024-05-08",
    featured: true,
    specs: {
      wireless_version: "V5.4",
      wireless_range: ">10m",
      earbuds_charging_input: "DC5V/20ma",
      earbud_battery: "35mAh",
      music_time: "5.5h (Volume 70%)",
      talk_time: "5h (Volume 70%)",
      battery: "250mAh",
      input_current: "5v/180mA",
      standby_time: "2000h",
      charging_time: "1.1h",
      usb: "Type-C"
    }
  },
  {
    product_id: 9,
    title: "AST-G9",
    description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
    discount_price: 2400,
    current_price: 4200,
    discount_percentage: 43,
    product_feature_img: "/ast/products/ast-g9.webp",
    product_images: [
      "/ast/products/posts/ast-g9.webp",
      "/ast/products/posts-2/ast-g9.webp",
      "/ast/products/ast-g9.webp",
    ],
    product_stock: 80,
    reviews: 12,
    ratings: 4.5,
    product_colors: ["Black", "Blue"],
    category: "Electronics",
    series: "AST-G",
    mood: "Gaming",
    keywords: ["wireless", "earbuds", "audio"],
    made_country: "China",
    creation_date: "2024-05-09",
    featured: false,
    specs: {
      wireless_version: "V5.3",
      wireless_range: "12m",
      earbuds_charging_input: "DC5V/25ma",
      earbud_battery: "25mAh",
      music_time: "4.5h (Volume 70%)",
      talk_time: "4h (Volume 70%)",
      battery: "200mAh",
      input_current: "5v/280mA",
      standby_time: "3000h",
      charging_time: "80min",
      charge_times_case_to_earbuds: "3 time",
      usb: "Type-C"
    }
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const lang = (query.lang as string) || 'en'
  
  // Supported languages
  const supportedLanguages: SupportedLanguage[] = ['en', 'ur', 'ar']
  
  // Validate language parameter
  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Unsupported language: ${lang}. Supported languages: ${supportedLanguages.join(', ')}`
    })
  }

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
    filteredProducts = filteredProducts.slice(0, limit)
  }

  return {
    products: filteredProducts,
    total: filteredProducts.length,
    language: lang
  }
})
