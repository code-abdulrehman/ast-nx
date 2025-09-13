import { computed, type Ref } from 'vue'

/**
 * Simple direction composable for RTL/LTR support
 * Works without i18n dependencies for testing
 */
export const useSimpleDirection = (locale: Ref<string>) => {
  // RTL languages configuration
  const RTL_LANGUAGES = ['ar', 'ur', 'he', 'fa', 'ku', 'ps', 'sd'] as const

  /**
   * Current text direction (rtl or ltr)
   */
  const textDirection = computed(() => {
    return RTL_LANGUAGES.includes(locale.value as any) ? 'rtl' : 'ltr'
  })

  /**
   * Current text alignment class
   */
  const textAlign = computed(() => {
    return textDirection.value === 'rtl' ? 'text-right' : 'text-left'
  })

  /**
   * Check if current locale is RTL
   */
  const isRTL = computed(() => textDirection.value === 'rtl')

  /**
   * Check if current locale is LTR
   */
  const isLTR = computed(() => textDirection.value === 'ltr')

  /**
   * Get flex direction class based on current direction
   */
  const flexDirection = computed(() => {
    return isRTL.value ? 'flex-row-reverse' : ''
  })

  /**
   * Get input padding classes for RTL/LTR
   */
  const inputPadding = computed(() => {
    return {
      withIcon: isRTL.value ? 'pr-10 pl-4' : 'pl-10 pr-4',
      withButton: isRTL.value ? 'pr-16 pl-4' : 'pl-16 pr-4',
      withIconAndButton: isRTL.value ? 'pr-20 pl-10' : 'pl-20 pr-10'
    }
  })

  /**
   * Get icon positioning classes for inputs
   */
  const iconPosition = computed(() => {
    return {
      left: isRTL.value ? 'right-0 pr-3' : 'left-0 pl-3',
      right: isRTL.value ? 'left-0 pl-3' : 'right-0 pr-3'
    }
  })

  /**
   * Get button positioning classes
   */
  const buttonPosition = computed(() => {
    return {
      left: isRTL.value ? 'left-0 rounded-l-lg' : 'right-0 rounded-r-lg',
      right: isRTL.value ? 'right-0 rounded-r-lg' : 'left-0 rounded-l-lg'
    }
  })

  /**
   * Get dropdown positioning classes
   */
  const dropdownPosition = computed(() => {
    return {
      left: isRTL.value ? 'left-0' : 'right-0',
      right: isRTL.value ? 'right-0' : 'left-0'
    }
  })

  /**
   * Get icon rotation class
   */
  const iconRotation = computed(() => {
    return isRTL.value ? 'rotate-180' : ''
  })

  /**
   * Utility function to get conditional class
   */
  const getConditionalClass = (rtlClass: string, ltrClass: string = '') => {
    return computed(() => isRTL.value ? rtlClass : ltrClass)
  }

  /**
   * Utility function to get conditional value
   */
  const getConditionalValue = <T>(rtlValue: T, ltrValue: T) => {
    return computed(() => isRTL.value ? rtlValue : ltrValue)
  }

  return {
    // Core direction properties
    textDirection,
    textAlign,
    isRTL,
    isLTR,
    
    // Layout utilities
    flexDirection,
    
    // Component-specific utilities
    inputPadding,
    iconPosition,
    buttonPosition,
    dropdownPosition,
    iconRotation,
    
    // Utility functions
    getConditionalClass,
    getConditionalValue
  }
}
