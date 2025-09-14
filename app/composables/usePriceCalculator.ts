import { calculateDiscountedPrice, calculateMultiplePrices, formatPrice, calculateDiscountPercentage } from '../../utils/priceCalculator'
import type { PriceCalculation } from '../../utils/priceCalculator'

/**
 * Composable for price calculations
 */
export const usePriceCalculator = () => {
  
  /**
   * Calculate discounted price from original price and discount percentage
   */
  const getDiscountedPrice = (originalPrice: number, discountPercentage: number): PriceCalculation => {
    return calculateDiscountedPrice(originalPrice, discountPercentage)
  }
  
  /**
   * Calculate multiple product prices at once
   */
  const calculateProductPrices = <T extends { originalPrice: number; discountPercentage: number }>(
    products: T[]
  ): (T & PriceCalculation)[] => {
    return calculateMultiplePrices(products)
  }
  
  /**
   * Format price for display
   */
  const formatPriceDisplay = (price: number, currency: string = 'PKR'): string => {
    return formatPrice(price, currency)
  }
  
  /**
   * Calculate discount percentage from original and discounted prices
   */
  const getDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    return calculateDiscountPercentage(originalPrice, discountedPrice)
  }
  
  /**
   * Get price breakdown for a product
   */
  const getPriceBreakdown = (originalPrice: number, discountPercentage: number) => {
    const calculation = getDiscountedPrice(originalPrice, discountPercentage)
    
    return {
      original: calculation.originalPrice,
      discounted: calculation.discountedPrice,
      percentage: calculation.discountPercentage,
      savings: calculation.savings,
      formatted: {
        original: formatPriceDisplay(calculation.originalPrice),
        discounted: formatPriceDisplay(calculation.discountedPrice),
        savings: formatPriceDisplay(calculation.savings)
      }
    }
  }
  
  /**
   * Check if a price is on sale
   */
  const isOnSale = (discountPercentage: number): boolean => {
    return discountPercentage > 0
  }
  
  /**
   * Get sale badge text
   */
  const getSaleBadge = (discountPercentage: number): string => {
    return `${discountPercentage}% OFF`
  }
  
  return {
    // Core functions
    getDiscountedPrice,
    calculateProductPrices,
    formatPriceDisplay,
    getDiscountPercentage,
    
    // Helper functions
    getPriceBreakdown,
    isOnSale,
    getSaleBadge
  }
}
