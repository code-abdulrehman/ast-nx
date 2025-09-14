

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
  
  // Get products data from server API with proper language support
  const getProductsData = (lang: string) => {
    // Use the server API data with proper language support
    const baseProducts = [
      {
        product_id: 1,
        en: {
          title: "AST-G1",
          description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
          category: "Electronics",
          keywords: ["wireless", "earbuds", "audio"]
        },
        ar: {
          title: "AST-G1",
          description: "ستيريو لاسلكي حقيقي. صوت عالي الدقة، تشفير 100%",
          category: "إلكترونيات",
          keywords: ["لاسلكي", "سماعات", "صوت"]
        },
        ur: {
          title: "AST-G1",
          description: "ٹرو وائرلیس سٹیریو۔ ہائی فائی آڈیو، 100% انکرپشن",
          category: "الیکٹرانکس",
          keywords: ["وائرلیس", "ایئربڈز", "آڈیو"]
        },
        discount_price: 2400,
        current_price: 3500,
        discount_percentage: 31,
        product_feature_img: "/ast/products/ast-g1.webp",
        banner_image: "/ast/banners/main-banner.webp",
        product_images: ["/ast/products/ast-g1.webp"],
        product_stock: 150,
        reviews: 1247,
        ratings: 4.8,
        product_colors: ["Black", "White", "Gold"],
        series: "AST-G",
        mood: "Normal",
        made_country: "China",
        creation_date: "2024-05-01",
        featured: true,
        specs: {}
      },
      {
        product_id: 2,
        en: {
          title: "AST-G2",
          description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
          category: "Electronics",
          keywords: ["wireless", "earbuds", "audio"]
        },
        ar: {
          title: "AST-G2",
          description: "ستيريو لاسلكي حقيقي. صوت عالي الدقة، تشفير 100%",
          category: "إلكترونيات",
          keywords: ["لاسلكي", "سماعات", "صوت"]
        },
        ur: {
          title: "AST-G2",
          description: "ٹرو وائرلیس سٹیریو۔ ہائی فائی آڈیو، 100% انکرپشن",
          category: "الیکٹرانکس",
          keywords: ["وائرلیس", "ایئربڈز", "آڈیو"]
        },
        discount_price: 2100,
        current_price: 3200,
        discount_percentage: 34,
        product_feature_img: "/ast/products/ast-g2.webp",
        banner_image: "/ast/banners/main-banner.webp",
        product_images: ["/ast/products/ast-g2.webp"],
        product_stock: 75,
        reviews: 92,
        ratings: 3.7,
        product_colors: ["Black"],
        series: "AST-G",
        mood: "Normal",
        made_country: "China",
        creation_date: "2024-05-02",
        featured: true,
        shipping: true,
        specs: {}
      },
      {
        product_id: 8,
        en: {
          title: "AST-G8",
          description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
          category: "Electronics",
          keywords: ["wireless", "earbuds", "audio", "gaming"]
        },
        ar: {
          title: "AST-G8",
          description: "ستيريو لاسلكي حقيقي. صوت عالي الدقة، تشفير 100%",
          category: "إلكترونيات",
          keywords: ["لاسلكي", "سماعات", "صوت", "ألعاب"]
        },
        ur: {
          title: "AST-G8",
          description: "ٹرو وائرلیس سٹیریو۔ ہائی فائی آڈیو، 100% انکرپشن",
          category: "الیکٹرانکس",
          keywords: ["وائرلیس", "ایئربڈز", "آڈیو", "گیمنگ"]
        },
        discount_price: 2500,
        current_price: 4500,
        discount_percentage: 44,
        product_feature_img: "/ast/products/ast-g8.webp",
        banner_image: "/ast/banners/main-banner.webp",
        product_images: ["/ast/products/ast-g8.webp"],
        product_stock: 100,
        reviews: 100,
        ratings: 4.5,
        product_colors: ["Black", "White"],
        series: "AST-G",
        mood: "Gaming",
        made_country: "China",
        creation_date: "2024-05-08",
        featured: true,
        specs: {}
      },
      {
        product_id: 9,
        en: {
          title: "AST-G9",
          description: "True Wireless Sterea. Hi-Fi Audio, 100%ENC",
          category: "Electronics",
          keywords: ["wireless", "earbuds", "audio", "gaming"]
        },
        ar: {
          title: "AST-G9",
          description: "ستيريو لاسلكي حقيقي. صوت عالي الدقة، تشفير 100%",
          category: "إلكترونيات",
          keywords: ["لاسلكي", "سماعات", "صوت", "ألعاب"]
        },
        ur: {
          title: "AST-G9",
          description: "ٹرو وائرلیس سٹیریو۔ ہائی فائی آڈیو، 100% انکرپشن",
          category: "الیکٹرانکس",
          keywords: ["وائرلیس", "ایئربڈز", "آڈیو", "گیمنگ"]
        },
        discount_price: 2400,
        current_price: 4200,
        discount_percentage: 43,
        product_feature_img: "/ast/products/ast-g9.webp",
        product_images: ["/ast/products/ast-g9.webp"],
        product_stock: 80,
        reviews: 12,
        ratings: 4.5,
        product_colors: ["Black", "Blue"],
        series: "AST-G",
        mood: "Gaming",
        made_country: "China",
        creation_date: "2024-05-09",
        featured: false,
        specs: {}
      }
    ]

    // Transform multilingual data to single language
    return baseProducts.map(product => {
      const langData = (product as any)[lang] || (product as any).en
      return {
        product_id: product.product_id,
        title: langData.title,
        description: langData.description,
        category: langData.category,
        keywords: langData.keywords,
        discount_price: product.discount_price,
        current_price: product.current_price,
        discount_percentage: product.discount_percentage,
        product_feature_img: product.product_feature_img,
        banner_image: product.banner_image,
        product_images: product.product_images,
        product_stock: product.product_stock,
        reviews: product.reviews,
        ratings: product.ratings,
        product_colors: product.product_colors,
        series: product.series,
        mood: product.mood,
        made_country: product.made_country,
        creation_date: product.creation_date,
        featured: product.featured,
        shipping: product.shipping,
        specs: product.specs
      }
    })
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
    const allProducts = allProductsData.value.products
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
    const product = allProductsData.value.products.find(p => p.product_id === productId)
    
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
    return allProductsData.value.products
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
