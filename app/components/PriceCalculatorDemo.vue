<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Price Calculator Demo</h2>
    
    <!-- Input Form -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Original Price (PKR)
        </label>
        <input
          v-model.number="originalPrice"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter original price"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Discount Percentage (%)
        </label>
        <input
          v-model.number="discountPercentage"
          type="number"
          min="0"
          max="100"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter discount percentage"
        />
      </div>
    </div>
    
    <!-- Calculate Button -->
    <button
      @click="calculatePrice"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mb-6"
    >
      Calculate Price
    </button>
    
    <!-- Results -->
    <div v-if="priceBreakdown" class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Price Breakdown</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Original Price:</span>
            <span class="font-medium">{{ priceBreakdown.formatted.original }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Discount:</span>
            <span class="font-medium text-red-600">{{ priceBreakdown.percentage }}%</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Savings:</span>
            <span class="font-medium text-green-600">{{ priceBreakdown.formatted.savings }}</span>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Final Price:</span>
            <span class="font-bold text-lg text-blue-600">{{ priceBreakdown.formatted.discounted }}</span>
          </div>
          
          <div v-if="priceBreakdown.percentage > 0" class="flex justify-between">
            <span class="text-gray-600">Sale Badge:</span>
            <span class="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {{ getSaleBadge(priceBreakdown.percentage) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Example Products -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Example Products</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="product in exampleProducts"
          :key="product.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h4 class="font-medium text-gray-800">{{ product.name }}</h4>
          <div class="mt-2 space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Original:</span>
              <span>{{ formatPriceDisplay(product.originalPrice) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Discount:</span>
              <span class="text-red-600">{{ product.discountPercentage }}%</span>
            </div>
            <div class="flex justify-between text-sm font-medium">
              <span class="text-gray-600">Final:</span>
              <span class="text-blue-600">{{ formatPriceDisplay(product.finalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePriceCalculator } from '~/composables/usePriceCalculator'

const { getPriceBreakdown, formatPriceDisplay, getSaleBadge } = usePriceCalculator()

// Reactive data
const originalPrice = ref(3500)
const discountPercentage = ref(31)
const priceBreakdown = ref(null)

// Example products with calculated prices
const exampleProducts = computed(() => [
  {
    id: 1,
    name: 'AST-G1',
    originalPrice: 3500,
    discountPercentage: 31,
    finalPrice: 2415
  },
  {
    id: 2,
    name: 'AST-G2',
    originalPrice: 3200,
    discountPercentage: 34,
    finalPrice: 2112
  },
  {
    id: 3,
    name: 'AST-G8',
    originalPrice: 4500,
    discountPercentage: 44,
    finalPrice: 2520
  },
  {
    id: 4,
    name: 'AST-G9',
    originalPrice: 4200,
    discountPercentage: 43,
    finalPrice: 2394
  }
])

// Calculate price function
const calculatePrice = () => {
  if (originalPrice.value && discountPercentage.value >= 0) {
    priceBreakdown.value = getPriceBreakdown(originalPrice.value, discountPercentage.value)
  }
}

// Calculate on component mount
calculatePrice()
</script>
