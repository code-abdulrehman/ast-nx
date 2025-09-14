<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Multi-Currency Price Calculator</h2>
    
    <!-- Currency Selector -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ getCurrencyLabels().selectCurrency }}
      </label>
      <CurrencySelector />
    </div>
    
    <!-- Input Form -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ getCurrencyLabels().originalPrice }} ({{ baseCurrency }})
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
          {{ getCurrencyLabels().discount }} (%)
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
      {{ getCurrencyLabels().calculate }}
    </button>
    
    <!-- Results -->
    <div v-if="priceBreakdown" class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Price Breakdown</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ getCurrencyLabels().originalPrice }}:</span>
            <span class="font-medium">{{ priceBreakdown.original.formatted }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">{{ getCurrencyLabels().discount }}:</span>
            <span class="font-medium text-red-600">{{ priceBreakdown.percentage }}%</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">{{ getCurrencyLabels().savings }}:</span>
            <span class="font-medium text-green-600">{{ priceBreakdown.savings.formatted }}</span>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ getCurrencyLabels().discountedPrice }}:</span>
            <span class="font-bold text-lg text-blue-600">{{ priceBreakdown.discounted.formatted }}</span>
          </div>
          
          <div v-if="priceBreakdown.percentage > 0" class="flex justify-between">
            <span class="text-gray-600">Sale Badge:</span>
            <span class="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {{ priceBreakdown.percentage }}% {{ getCurrencyLabels().discount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Currency Comparison -->
    <div v-if="priceBreakdown" class="mt-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Currency Comparison</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="currency in availableCurrencies.slice(0, 6)"
          :key="currency.code"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h4 class="font-medium text-gray-800 flex items-center gap-2">
            <span class="text-lg">{{ currency.symbol }}</span>
            {{ currency.name }}
          </h4>
          <div class="mt-2 space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ getCurrencyLabels().originalPrice }}:</span>
              <span>{{ formatPrice(priceBreakdown.original.amount, currency.code) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ getCurrencyLabels().discountedPrice }}:</span>
              <span class="text-blue-600 font-medium">{{ formatPrice(priceBreakdown.discounted.amount, currency.code) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ getCurrencyLabels().savings }}:</span>
              <span class="text-green-600">{{ formatPrice(priceBreakdown.savings.amount, currency.code) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Exchange Rates Info -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2 text-blue-800">Exchange Rates (Base: {{ baseCurrency }})</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div
          v-for="(rate, currency) in exchangeRates"
          :key="currency"
          class="flex justify-between"
        >
          <span class="text-gray-600">{{ currency }}:</span>
          <span class="font-medium">{{ rate.toFixed(4) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrency } from '~/composables/useCurrency'
import { usePriceCalculator } from '~/composables/usePriceCalculator'
import CurrencySelector from '~/components/CurrencySelector.vue'

const { 
  selectedCurrency,
  availableCurrencies, 
  baseCurrency, 
  exchangeRates, 
  formatPrice, 
  getCurrencyLabels,
  getPriceBreakdown: currencyGetPriceBreakdown
} = useCurrency()

const { getPriceBreakdown } = usePriceCalculator()

// Reactive data
const originalPrice = ref(3500)
const discountPercentage = ref(31)
const priceBreakdown = ref(null)

// Calculate price function
const calculatePrice = () => {
  if (originalPrice.value && discountPercentage.value >= 0) {
    priceBreakdown.value = currencyGetPriceBreakdown(originalPrice.value, discountPercentage.value, selectedCurrency.value)
  }
}

// Calculate on component mount
calculatePrice()
</script>
