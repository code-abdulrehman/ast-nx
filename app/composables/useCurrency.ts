import { ref, computed } from 'vue'
import { useLanguageData } from '~/composables/useLanguageData'

/**
 * Currency management composable
 */
export const useCurrency = () => {
  const { languageData } = useLanguageData()
  
  // Current selected currency
  const selectedCurrency = ref('PKR')
  
  // Get pricing data from language files
  const pricingData = computed(() => {
    return (languageData.value as any)?.pricing || null
  })
  
  // Get available currencies
  const availableCurrencies = computed(() => {
    if (!pricingData.value?.currencies) return []
    
    return Object.entries(pricingData.value.currencies).map(([code, currency]: [string, any]) => ({
      code,
      name: currency.name,
      symbol: currency.symbol,
      position: currency.position,
      decimalPlaces: currency.decimalPlaces,
      thousandSeparator: currency.thousandSeparator,
      decimalSeparator: currency.decimalSeparator,
      locale: currency.locale
    }))
  })
  
  // Get current currency configuration
  const currentCurrency = computed(() => {
    if (!pricingData.value?.currencies) return null
    
    const currency = pricingData.value.currencies[selectedCurrency.value]
    if (!currency) return null
    
    return {
      code: selectedCurrency.value,
      name: currency.name,
      symbol: currency.symbol,
      position: currency.position,
      decimalPlaces: currency.decimalPlaces,
      thousandSeparator: currency.thousandSeparator,
      decimalSeparator: currency.decimalSeparator,
      locale: currency.locale
    }
  })
  
  // Get exchange rates
  const exchangeRates = computed(() => {
    return pricingData.value?.exchangeRates || null
  })
  
  // Get base currency
  const baseCurrency = computed(() => {
    return exchangeRates.value?.base || 'PKR'
  })
  
  // Convert amount from base currency to selected currency
  const convertAmount = (amount: number, fromCurrency: string = baseCurrency.value, toCurrency: string = selectedCurrency.value): number => {
    if (!exchangeRates.value || fromCurrency === toCurrency) return amount
    
    const rates = exchangeRates.value.rates
    
    // Convert from base currency to target currency
    if (fromCurrency === baseCurrency.value) {
      const rate = rates[toCurrency]
      return rate ? amount * rate : amount
    }
    
    // Convert from target currency to base currency, then to final currency
    if (toCurrency === baseCurrency.value) {
      const rate = rates[fromCurrency]
      return rate ? amount / rate : amount
    }
    
    // Convert between two non-base currencies
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    
    if (fromRate && toRate) {
      return (amount / fromRate) * toRate
    }
    
    return amount
  }
  
  // Format price with currency
  const formatPrice = (amount: number, currencyCode: string = selectedCurrency.value): string => {
    const currency = currencyCode === selectedCurrency.value 
      ? currentCurrency.value 
      : availableCurrencies.value.find(c => c.code === currencyCode)
    
    if (!currency) return `${amount}`
    
    // Convert amount if needed
    const convertedAmount = convertAmount(amount, baseCurrency.value, currencyCode)
    
    // Format number with proper decimal places and separators
    const formattedNumber = formatNumber(convertedAmount, currency.decimalPlaces, currency.thousandSeparator, currency.decimalSeparator)
    
    // Apply currency symbol position
    if (currency.position === 'after') {
      return `${formattedNumber} ${currency.symbol}`
    } else {
      return `${currency.symbol}${formattedNumber}`
    }
  }
  
  // Format number with separators
  const formatNumber = (amount: number, decimalPlaces: number, thousandSeparator: string, decimalSeparator: string): string => {
    const fixedAmount = amount.toFixed(decimalPlaces)
    const [integerPart, decimalPart] = fixedAmount.split('.')
    
    // Add thousand separators
    const formattedInteger = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) || '0'
    
    // Combine with decimal part if needed
    if (decimalPlaces > 0 && decimalPart) {
      return `${formattedInteger}${decimalSeparator}${decimalPart}`
    }
    
    return formattedInteger
  }
  
  // Set currency
  const setCurrency = (currencyCode: string) => {
    if (availableCurrencies.value.find(c => c.code === currencyCode)) {
      selectedCurrency.value = currencyCode
    }
  }
  
  // Get currency labels
  const getCurrencyLabels = () => {
    return pricingData.value?.labels || {}
  }
  
  // Get global pricing settings
  const getGlobalSettings = () => {
    return pricingData.value?.global || {}
  }
  
  // Calculate price breakdown with currency conversion
  const getPriceBreakdown = (originalPrice: number, discountPercentage: number, currencyCode: string = selectedCurrency.value) => {
    const discountAmount = (originalPrice * discountPercentage) / 100
    const discountedPrice = originalPrice - discountAmount
    
    return {
      original: {
        amount: originalPrice,
        converted: convertAmount(originalPrice, baseCurrency.value, currencyCode),
        formatted: formatPrice(originalPrice, currencyCode)
      },
      discounted: {
        amount: discountedPrice,
        converted: convertAmount(discountedPrice, baseCurrency.value, currencyCode),
        formatted: formatPrice(discountedPrice, currencyCode)
      },
      savings: {
        amount: discountAmount,
        converted: convertAmount(discountAmount, baseCurrency.value, currencyCode),
        formatted: formatPrice(discountAmount, currencyCode)
      },
      percentage: discountPercentage,
      currency: currencyCode
    }
  }
  
  return {
    // State
    selectedCurrency,
    
    // Computed
    availableCurrencies,
    currentCurrency,
    exchangeRates,
    baseCurrency,
    pricingData,
    
    // Methods
    convertAmount,
    formatPrice,
    formatNumber,
    setCurrency,
    getCurrencyLabels,
    getGlobalSettings,
    getPriceBreakdown
  }
}
