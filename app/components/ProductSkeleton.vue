<template>
  <div class="container mx-auto transition-all ease-linear duration-300 overflow-x-hidden">
    <div class="md:p-4 px-4 py-2 flex flex-col items-start">
      <!-- Breadcrumb Skeleton -->
      <nav class="mb-6">
        <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      </nav>
    </div>

    <!-- Product Details Grid Skeleton -->
    <div class="max-w-6xl mx-auto px-4 py-2">
      <div class="grid grid-cols-[auto] lg:grid-cols-2 gap-2 md:gap-8">
        <!-- Product Images Skeleton -->
        <div class="space-y-4 flex flex-row md:flex-col justify-between md:justify-center md:items-center items-start gap-2">
          <!-- Main Image Skeleton -->
          <div class="aspect-square rounded-lg overflow-hidden h-[36vh] md:h-[450px] w-[100%] flex-1 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse">
            <div class="w-full h-full flex items-center justify-center">
              <Icon name="image" size="3xl" color="text-gray-400" />
            </div>
          </div>
          
          <!-- Thumbnail Images Skeleton -->
          <div class="grid md:grid-cols-4 grid-cols-1 grid-rows-2 md:grid-rows-1 gap-2" style="margin-top: 0px;">
            <div
              v-for="i in 2"
              :key="i"
              class="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 h-[10vh] md:h-full w-[10vh] md:w-full bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse"
            >
              <div class="w-full h-full flex items-center justify-center">
                <Icon name="image" size="lg" color="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info Skeleton -->
        <div class="md:space-y-4 space-y-1">
          <!-- Title and Description Skeleton -->
          <div>
            <div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
            <div class="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <!-- Rating Skeleton -->
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i" class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <!-- Price Skeleton -->
          <div class="flex items-center gap-4">
            <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <!-- Stock Status Skeleton -->
          <div class="flex items-center gap-2">
            <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <!-- Button Skeleton -->
          <div class="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>

          <!-- Product Information Skeleton -->
          <div>
            <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div class="space-y-2 pl-2">
              <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <!-- Tags Skeleton -->
          <div>
            <div class="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div class="flex flex-wrap gap-2">
              <div v-for="i in 3" :key="i" class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Section Skeleton -->
      <div class="mt-12">
        <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <hr class="mb-6" />
        <div class="space-y-6">
          <div v-for="i in 2" :key="i" class="p-2">
            <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div class="space-y-3 pl-2">
              <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Specifications Section Skeleton -->
      <div class="mt-8">
        <hr class="mb-8 border-gray-200" />
        <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div class="p-l-2">
          <div class="space-y-3 pl-2">
            <div v-for="i in 5" :key="i" class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Related Products Section Skeleton -->
      <div class="md:mt-16 mt-8">
        <hr class="mb-8 border-gray-200" />
        <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6 mx-auto"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="aspect-square bg-gray-200 animate-pulse"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- View All Products Button Skeleton -->
        <div class="text-center mt-8">
          <div class="h-12 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'
</script>
