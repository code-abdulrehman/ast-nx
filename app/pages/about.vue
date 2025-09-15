<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NuxtLink :to="getLocalizedHomeUrl()" class="text-gray-700 hover:text-primary" aria-label="ast-about-link">
            Home
          </NuxtLink>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 text-gray-500 md:ml-2">About</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About AST</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        We are a leading company dedicated to delivering innovative solutions and exceptional 
        products that make a difference in people's lives.
      </p>
    </div>

    <!-- Mission & Vision -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="bg-blue-50 p-8 rounded-lg">
        <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed">
          To provide innovative, high-quality products and services that exceed customer expectations 
          while maintaining the highest standards of integrity and excellence in everything we do.
        </p>
      </div>

      <div class="bg-green-50 p-8 rounded-lg">
        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p class="text-gray-600 leading-relaxed">
          To be the global leader in our industry, recognized for innovation, quality, and customer 
          satisfaction, while creating a positive impact on society and the environment.
        </p>
      </div>
    </div>

    <!-- Company Story -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
      <div class="max-w-4xl mx-auto">
        <p class="text-gray-600 leading-relaxed mb-6">
          Founded in 2020, AST began as a small startup with a big vision: to revolutionize the way 
          people interact with technology. What started as a passion project has grown into a 
          trusted brand serving customers worldwide.
        </p>
        <p class="text-gray-600 leading-relaxed mb-6">
          Our journey has been marked by continuous innovation, customer-centric approach, and a 
          commitment to excellence. We believe that great products come from understanding our 
          customers' needs and exceeding their expectations.
        </p>
        <p class="text-gray-600 leading-relaxed">
          Today, we continue to push boundaries, explore new possibilities, and deliver solutions 
          that make a real difference in people's lives. Our team of dedicated professionals works 
          tirelessly to ensure that every product we create meets the highest standards of quality 
          and performance.
        </p>
      </div>
    </div>

    <!-- Values -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
          <p class="text-gray-600 text-sm">We never compromise on quality and always strive for excellence.</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
          <p class="text-gray-600 text-sm">We embrace new ideas and technologies to stay ahead.</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Teamwork</h3>
          <p class="text-gray-600 text-sm">We believe in the power of collaboration and mutual respect.</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Passion</h3>
          <p class="text-gray-600 text-sm">We are passionate about what we do and it shows in our work.</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-gray-50 rounded-lg p-8 mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">By the Numbers</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">10K+</div>
          <div class="text-gray-600">Happy Customers</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">50+</div>
          <div class="text-gray-600">Products</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-600 mb-2">25+</div>
          <div class="text-gray-600">Countries</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-yellow-600 mb-2">99%</div>
          <div class="text-gray-600">Satisfaction Rate</div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
      <p class="text-gray-600 mb-8">Join thousands of satisfied customers who trust AST for their needs.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          aria-label="ast-product-page-link"
          :to="getLocalizedProductPageUrl()" 
          class="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium"
        >
          View Our Products
        </NuxtLink>
        <NuxtLink 
          aria-label="ast-contact-page-link"
          to="/contact" 
          class="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get current locale for URL preservation
const { locale } = useI18n()

// Set page title
useHead({
  title: 'About Us - AST',
  meta: [
    { name: 'description', content: 'Learn about AST - a leading company dedicated to delivering innovative solutions and exceptional products that make a difference in people\'s lives.' }
  ]
})

// Generate localized URLs
const getLocalizedProductPageUrl = () => {
  const baseUrl = '/product'
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
</script>
