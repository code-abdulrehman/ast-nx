/**
 * Price calculation utilities
 */

export interface PriceCalculation {
  originalPrice: number
  discountPercentage: number
  discountedPrice: number
  savings: number
}

/**
 * Calculate discounted price from original price and discount percentage
 * @param originalPrice - The original price of the product
 * @param discountPercentage - The discount percentage (0-100)
 * @returns PriceCalculation object with all calculated values
 */
export function calculateDiscountedPrice(
  originalPrice: number, 
  discountPercentage: number
): PriceCalculation {
  // Validate inputs
  if (originalPrice < 0) {
    throw new Error('Original price cannot be negative')
  }
  
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100')
  }
  
  // Calculate discounted price
  const discountAmount = (originalPrice * discountPercentage) / 100
  const discountedPrice = originalPrice - discountAmount
  const savings = discountAmount
  
  return {
    originalPrice,
    discountPercentage,
    discountedPrice: Math.round(discountedPrice), // Round to nearest integer
    savings: Math.round(savings)
  }
}

/**
 * Calculate multiple product prices at once
 * @param products - Array of products with originalPrice and discountPercentage
 * @returns Array of products with calculated prices
 */
export function calculateMultiplePrices<T extends { originalPrice: number; discountPercentage: number }>(
  products: T[]
): (T & PriceCalculation)[] {
  return products.map(product => ({
    ...product,
    ...calculateDiscountedPrice(product.originalPrice, product.discountPercentage)
  }))
}

/**
 * Format price for display with multiple currency support
 * @param price - The price to format
 * @param currency - Currency code (default: 'PKR')
 * @param currencyData - Currency configuration object
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = 'PKR', currencyData?: any): string {
  if (currencyData) {
    const { symbol, position, decimalPlaces, thousandSeparator, decimalSeparator } = currencyData
    
    // Format number with proper decimal places and separators
    const formattedNumber = formatNumber(price, decimalPlaces, thousandSeparator, decimalSeparator)
    
    // Apply currency symbol position
    if (position === 'after') {
      return `${formattedNumber} ${symbol}`
    } else {
      return `${symbol}${formattedNumber}`
    }
  }
  
  // Fallback to simple formatting
  return `${currency} ${price.toLocaleString()}`
}

/**
 * Format number with separators
 * @param amount - The amount to format
 * @param decimalPlaces - Number of decimal places
 * @param thousandSeparator - Thousand separator character
 * @param decimalSeparator - Decimal separator character
 * @returns Formatted number string
 */
export function formatNumber(amount: number, decimalPlaces: number, thousandSeparator: string, decimalSeparator: string): string {
  const fixedAmount = amount.toFixed(decimalPlaces)
  const [integerPart, decimalPart] = fixedAmount.split('.')
  
  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
  
  // Combine with decimal part if needed
  if (decimalPlaces > 0 && decimalPart) {
    return `${formattedInteger}${decimalSeparator}${decimalPart}`
  }
  
  return formattedInteger
}

/**
 * Calculate discount percentage from original and discounted prices
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns Discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: number, 
  discountedPrice: number
): number {
  if (originalPrice <= 0) {
    throw new Error('Original price must be greater than 0')
  }
  
  if (discountedPrice < 0) {
    throw new Error('Discounted price cannot be negative')
  }
  
  if (discountedPrice > originalPrice) {
    throw new Error('Discounted price cannot be greater than original price')
  }
  
  const discountAmount = originalPrice - discountedPrice
  return Math.round((discountAmount / originalPrice) * 100)
}

// Example usage:
// const price = calculateDiscountedPrice(3500, 31)
// console.log(price) // { originalPrice: 3500, discountPercentage: 31, discountedPrice: 2415, savings: 1085 }
