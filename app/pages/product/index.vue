<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NuxtLink :to="getLocalizedHomeUrl()" class="text-gray-700 hover:text-primary" aria-label="ast-homepage-link">
            Home
          </NuxtLink>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 text-gray-500 md:ml-2">Products</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Discover our premium collection of high-quality products designed to meet your needs 
        with exceptional performance and reliability.
      </p>
    </div>

    <!-- Filter and Sort -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
      <div class="flex items-center space-x-4">
        <select class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
          <option>Software</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
      <div class="text-sm text-gray-600">
        Showing {{ products.length }} products
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <!-- Product Image -->
        <div class="aspect-square bg-gray-100 relative overflow-hidden">
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <!-- Badge -->
          <div v-if="product.badge" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {{ product.badge }}
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>
          
          <!-- Rating -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <span class="text-sm text-gray-600 ml-2">({{ product.reviews }})</span>
          </div>

          <!-- Price -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">${{ product.originalPrice }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex space-x-2">
            <NuxtLink 
              aria-label="ast-single-product-page-link"
              :to="getLocalizedProductUrl(product.id)"
              class="flex-1 bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
            >
              View Details
            </NuxtLink>
            <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="text-center mt-12">
      <button
      aria-label="ast-load-more-products-button"
      class="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
        Load More Products
      </button>
    </div>
  </div>
</template>

<script setup>
// Get current locale for URL preservation
const { locale } = useI18n()

// Set page title
useHead({
  title: 'Products - AST',
  meta: [
    { name: 'description', content: 'Browse our premium collection of high-quality products designed to meet your needs with exceptional performance and reliability.' }
  ]
})

// Generate localized URLs
const getLocalizedProductUrl = (productId) => {
  const baseUrl = `/product/${productId}`
  // If locale is 'en' (default), don't add prefix
  if (locale.value === 'en') {
    return baseUrl
  }
  // For other locales, add the locale prefix
  return `/${locale.value}${baseUrl}`
}

const getLocalizedHomeUrl = () => {
  const baseUrl = '/'
  // If locale is 'en' (default), don't add prefix
  if (locale.value === 'en') {
    return baseUrl
  }
  // For other locales, add the locale prefix
  return `/${locale.value}${baseUrl}`
}

// Sample products data
const products = ref([
  {
    id: 1,
    name: 'AST Pro X1',
    description: 'Advanced professional device with cutting-edge technology and superior performance.',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4,
    reviews: 128,
    badge: 'Sale'
  },
  {
    id: 2,
    name: 'AST Elite Y2',
    description: 'Premium model featuring the latest innovations and premium materials.',
    price: 499.99,
    rating: 5,
    reviews: 89,
    badge: 'New'
  },
  {
    id: 3,
    name: 'AST Standard Z3',
    description: 'Reliable and efficient solution for everyday use with great value.',
    price: 199.99,
    rating: 4,
    reviews: 256
  },
  {
    id: 4,
    name: 'AST Compact A4',
    description: 'Portable and lightweight design perfect for on-the-go professionals.',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4,
    reviews: 67,
    badge: 'Sale'
  },
  {
    id: 5,
    name: 'AST Premium B5',
    description: 'Top-of-the-line model with all premium features and accessories.',
    price: 799.99,
    rating: 5,
    reviews: 45,
    badge: 'Limited'
  },
  {
    id: 6,
    name: 'AST Basic C6',
    description: 'Essential features at an affordable price point for budget-conscious users.',
    price: 99.99,
    rating: 3,
    reviews: 312
  }
])
</script>