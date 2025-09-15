<script setup>
import { useI18n } from '#imports'
import Icon from './Icon.vue'

// Props
const props = defineProps({
  // Button text
  text: {
    type: String,
    required: true
  },
  // Button color/type
  color: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'success', 'teal', 'ghost', 'white', 'red', 'blue', 'green'
    ].includes(value)
  },
  // Button size
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  // Button variant
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'outline', 'ghost'].includes(value)
  },
  // Icon name
  icon: {
    type: String,
    default: null
  },
  // Icon position
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'only'].includes(value)
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false
  },
  // Loading state
  loading: {
    type: Boolean,
    default: false
  },
  // Full width
  fullWidth: {
    type: Boolean,
    default: false
  },
  // Custom classes
  customClass: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['click'])

// I18n
const { locale } = useI18n()

// Use direction composable for RTL/LTR support
const { textAlign, isRTL, htmlAttributes } = useDirection(ref(locale));

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  return sizes[props.size]
})

// Icon size classes - no longer needed since we use size prop directly in Icon component

// Color classes
const colorClasses = computed(() => {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const colorStyles = {
    primary: {
      solid: 'bg-primary text-white hover:bg-primary-hover',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      ghost: 'text-blue-600 hover:bg-blue-50'
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      ghost: 'text-gray-600 hover:bg-gray-50'
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700',
      outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
      ghost: 'text-green-600 hover:bg-green-50'
    },
    teal: {
      solid: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
      outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500',
      ghost: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500'
    },
    ghost: {
      solid: 'bg-transparent text-gray-700 hover:bg-gray-100',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100'
    },
    white: {
      solid: 'bg-white text-gray-900 hover:bg-gray-50',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900',
      ghost: 'text-white hover:bg-white hover:text-gray-900'
    },
    red: {
      solid: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      ghost: 'text-red-600 hover:bg-red-50'
    },
    blue: {
      solid: 'bg-blue-500 text-white hover:bg-blue-600',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
      ghost: 'text-blue-500 hover:bg-blue-50'
    },
    green: {
      solid: 'bg-green-600 text-white hover:bg-green-600',
      outline: 'border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white',
      ghost: 'text-green-500 hover:bg-green-50'
    }
  }
  
  return `${baseClasses} ${colorStyles[props.color]?.[props.variant] || colorStyles.primary.solid}`
})

// Disabled classes
const disabledClasses = computed(() => {
  if (props.disabled || props.loading) {
    return 'opacity-50 cursor-not-allowed'
  }
  return 'cursor-pointer'
})

// Full width classes
const fullWidthClasses = computed(() => {
  return props.fullWidth ? 'w-full' : ''
})

// RTL icon position
const iconPositionClasses = computed(() => {
  if (props.iconPosition === 'only') return ''
  
  const isIconLeft = (props.iconPosition === 'left' && !isRTL.value) || (props.iconPosition === 'right' && isRTL.value)
  return isIconLeft ? 'flex-row' : 'flex-row-reverse'
})

// Handle click
const handleClick = (event) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// No need for getIconName function anymore since we're using our custom Icon component
</script>

<template>
  <button
    aria-label="ast-button"
    :class="[
      'inline-flex items-center justify-center rounded-lg',
      sizeClasses,
      colorClasses,
      disabledClasses,
      fullWidthClasses,
      iconPositionClasses,
      customClass
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="htmlAttributes"
  >
    <!-- Loading spinner -->
    <Icon
      v-if="loading"
      name="loading"
      :size="size"
      custom-class="animate-spin"
    />
    
    <!-- Left icon -->
    <Icon
      v-else-if="icon && iconPosition !== 'right' && iconPosition !== 'only'"
      :name="icon"
      :size="size"
      :custom-class="text ? 'mr-2' : ''"
    />
    
    <!-- Button text -->
    <span v-if="iconPosition !== 'only'" :class="textAlign">
      {{ text }}
    </span>
    
    <!-- Right icon -->
    <Icon
      v-if="icon && iconPosition === 'right' && !loading"
      :name="icon"
      :size="size"
      :custom-class="text ? 'ml-2' : ''"
    />
    
    <!-- Only icon -->
    <Icon
      v-if="icon && iconPosition === 'only' && !loading"
      :name="icon"
      :size="size"
    />
  </button>
</template>