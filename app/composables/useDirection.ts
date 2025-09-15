import { computed } from 'vue'

/**
 * Global direction composable for RTL/LTR support
 * Provides reactive direction utilities based on current locale
 */
export const useDirection = (locale?: Ref<string>) => {
  // RTL languages configuration
  const RTL_LANGUAGES = ['ar', 'ur', 'he', 'fa', 'ku', 'ps', 'sd'] as const

  // Get locale from parameter or use default
  const currentLocale = computed(() => locale?.value || 'en')

  /**
   * Current text direction (rtl or ltr)
   */
  const textDirection = computed(() => {
    return RTL_LANGUAGES.includes(currentLocale.value as any) ? 'rtl' : 'ltr'
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
   * Get margin/padding classes for RTL/LTR
   */
  const spacing = {
    /**
     * Get left/right margin classes
     */
    margin: computed(() => ({
      left: isRTL.value ? 'mr' : 'ml',
      right: isRTL.value ? 'ml' : 'mr'
    })),
    
    /**
     * Get left/right padding classes
     */
    padding: computed(() => ({
      left: isRTL.value ? 'pr' : 'pl',
      right: isRTL.value ? 'pl' : 'pr'
    }))
  }

  /**
   * Get positioning classes for absolute/fixed elements
   */
  const positioning = {
    /**
     * Get left/right positioning classes
     */
    absolute: computed(() => ({
      left: isRTL.value ? 'right' : 'left',
      right: isRTL.value ? 'left' : 'right'
    })),
    
    /**
     * Get border radius classes for RTL/LTR
     */
    borderRadius: computed(() => ({
      left: isRTL.value ? 'rounded-r' : 'rounded-l',
      right: isRTL.value ? 'rounded-l' : 'rounded-r'
    }))
  }

  /**
   * Get icon rotation class
   */
  const iconRotation = computed(() => {
    return isRTL.value ? 'rotate-180' : ''
  })
  const iconRotationReverse = computed(() => {
    return isRTL.value ? '' : 'rotate-180'
  })
  const mirror = computed(() => {
    return isRTL.value ? 'mirror' : ''
  })
  

  /**
   * Get transform classes for RTL/LTR
   */
  const transform = {
    /**
     * Get scale X transform for RTL
     */
    scaleX: computed(() => {
      return isRTL.value ? 'scale-x-[-1]' : ''
    }),
    
    /**
     * Get rotation for arrows and directional icons
     */
    rotate: computed(() => {
      return isRTL.value ? 'rotate-180' : ''
    })
  }

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
   * Get scroll behavior for RTL
   */
  const scrollBehavior = computed(() => {
    return isRTL.value ? 'scroll-right' : 'scroll-left'
  })

  /**
   * Get text shadow for RTL text
   */
  const textShadow = computed(() => {
    return isRTL.value ? 'text-shadow-rtl' : 'text-shadow-ltr'
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

  /**
   * Get all direction-related classes for a container
   */
  const containerClasses = computed(() => ({
    direction: textDirection.value,
    alignment: textAlign.value,
    flex: flexDirection.value
  }))

  /**
   * Get all direction-related attributes for HTML elements
   */
  const htmlAttributes = computed(() => ({
    dir: textDirection.value,
    lang: currentLocale.value
  }))

  return {
    // Core direction properties
    textDirection,
    textAlign,
    isRTL,
    isLTR,
    
    // Layout utilities
    flexDirection,
    spacing,
    positioning,
    
    // Visual utilities
    iconRotation,
    iconRotationReverse,
    mirror,
    transform,
    textShadow,
    
    // Component-specific utilities
    inputPadding,
    iconPosition,
    buttonPosition,
    dropdownPosition,
    scrollBehavior,
    
    // Utility functions
    getConditionalClass,
    getConditionalValue,
    containerClasses,
    htmlAttributes,
    
    // Configuration
    RTL_LANGUAGES: RTL_LANGUAGES
  }
}

/**
 * Type definitions for better TypeScript support
 */
export type DirectionComposable = ReturnType<typeof useDirection>
export type RTLanguage = 'ar' | 'ur' | 'he' | 'fa' | 'ku' | 'ps' | 'sd'