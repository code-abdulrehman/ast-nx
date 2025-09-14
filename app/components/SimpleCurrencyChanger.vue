<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Single Variable Currency Control</h2>
    
    <!-- Single Variable Display -->
    <div class="mb-6 p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Current Currency Variable:</h3>
      <code class="text-lg font-mono bg-white px-3 py-1 rounded border">
        selectedCurrency = "{{ selectedCurrency }}"
      </code>
    </div>
    
    <!-- Single Variable Control -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Change Currency (Single Variable):
      </label>
      <select 
        v-model="selectedCurrency" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="PKR">روپے (PKR)</option>
        <option value="USD">$ (USD)</option>
        <option value="AED">د.إ (AED)</option>
        <option value="SAR">ر.س (SAR)</option>
        <option value="EUR">€ (EUR)</option>
        <option value="GBP">£ (GBP)</option>
        <option value="INR">₹ (INR)</option>
        <option value="QAR">ر.ق (QAR)</option>
        <option value="KWD">د.ك (KWD)</option>
        <option value="BHD">د.ب (BHD)</option>
      </select>
    </div>
    
    <!-- Quick Change Buttons -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Quick Change (Single Variable Assignment):
      </label>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        <button 
          v-for="currency in quickCurrencies" 
          :key="currency.code"
          @click="selectedCurrency = currency.code"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'bg-blue-100 border-blue-500': selectedCurrency === currency.code }"
        >
          {{ currency.symbol }} {{ currency.code }}
        </button>
      </div>
    </div>
    
    <!-- Price Display (Automatically Updates) -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Price Display (Auto-Updates with Single Variable):</h3>
      
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600">Original Price:</span>
          <span class="font-medium">{{ formatPrice(3500) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Discounted Price:</span>
          <span class="font-medium text-blue-600">{{ formatPrice(2415) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Savings:</span>
          <span class="font-medium text-green-600">{{ formatPrice(1085) }}</span>
        </div>
      </div>
    </div>
    
    <!-- Code Example -->
    <div class="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Code Example:</h3>
      <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>// Single variable control
const { selectedCurrency, formatPrice } = useCurrency()

// Change currency with one line
selectedCurrency.value = 'USD'  // All prices update automatically

// Display prices (automatically uses current currency)
const price = formatPrice(3500)  // Shows in selected currency</code></pre>
    </div>
  </div>
</template>

<script setup>
import { useCurrency } from '~/composables/useCurrency'

const { selectedCurrency, formatPrice, availableCurrencies } = useCurrency()

// Quick currency options
const quickCurrencies = [
  { code: 'PKR', symbol: 'روپے' },
  { code: 'USD', symbol: '$' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'SAR', symbol: 'ر.س' },
  { code: 'EUR', symbol: '€' }
]
</script>
