<template>
  <div class="relative">
    <!-- Currency Selector Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
      :class="{ 'ring-2 ring-primary': isOpen }"
    >
      <span class="text-sm font-medium">{{ currentCurrency?.symbol }}</span>
      <span class="text-sm text-gray-600">{{ currentCurrency?.code }}</span>
      <Icon 
        name="chevron-down" 
        size="sm" 
        :class="['transition-transform', isOpen ? 'rotate-180' : '']"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <div class="p-2">
        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
          {{ getCurrencyLabels().selectCurrency }}
        </div>
        
        <div
          v-for="currency in availableCurrencies"
          :key="currency.code"
          @click="selectCurrency(currency.code)"
          class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          :class="{ 'bg-primary/10 text-primary': currency.code === selectedCurrency }"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg font-medium">{{ currency.symbol }}</span>
            <div>
              <div class="text-sm font-medium">{{ currency.name }}</div>
              <div class="text-xs text-gray-500">{{ currency.code }}</div>
            </div>
          </div>
          
          <div v-if="currency.code === selectedCurrency" class="text-primary">
            <Icon name="check" size="sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCurrency } from '~/composables/useCurrency'
import Icon from '~/components/Icon.vue'

const { 
  selectedCurrency, 
  availableCurrencies, 
  currentCurrency, 
  setCurrency, 
  getCurrencyLabels 
} = useCurrency()

const isOpen = ref(false)

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Close dropdown
const closeDropdown = () => {
  isOpen.value = false
}

// Select currency
const selectCurrency = (currencyCode) => {
  setCurrency(currencyCode)
  closeDropdown()
}

// Close dropdown on escape key
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

// Add/remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>
