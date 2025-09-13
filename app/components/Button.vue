<script setup>
import { useI18n } from '#imports'
import { Icon } from '@iconify/vue'

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

// Icon size classes
const iconSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }
  return sizes[props.size]
})

// Color classes
const colorClasses = computed(() => {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const colorStyles = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500',
      ghost: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500'
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500',
      ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-500'
    },
    teal: {
      solid: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
      outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500',
      ghost: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500'
    },
    ghost: {
      solid: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    },
    white: {
      solid: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-gray-500',
      ghost: 'text-white hover:bg-white hover:text-gray-900 focus:ring-gray-500'
    },
    red: {
      solid: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500',
      ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-500'
    },
    blue: {
      solid: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-400',
      ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-blue-400'
    },
    green: {
      solid: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
      outline: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-green-400',
      ghost: 'text-green-500 hover:bg-green-50 focus:ring-green-400'
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

// Get icon name for custom SVG icons
const getIconName = (iconName) => {
  if (!iconName) return 'svg:default'
  return `svg:${iconName}`
}
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md',
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
      icon="svg:loading"
      :class="[iconSizeClasses, 'animate-spin']"
    />
    
    <!-- Left icon -->
    <Icon
      v-else-if="icon && iconPosition !== 'right' && iconPosition !== 'only'"
      :icon="getIconName(icon)"
      :class="[iconSizeClasses, text ? 'mr-2' : '']"
    />
    
    <!-- Button text -->
    <span v-if="iconPosition !== 'only'" :class="textAlign">
      {{ text }}
    </span>
    
    <!-- Right icon -->
    <Icon
      v-if="icon && iconPosition === 'right' && !loading"
      :icon="getIconName(icon)"
      :class="[iconSizeClasses, text ? 'ml-2' : '']"
    />
    
    <!-- Only icon -->
    <Icon
      v-if="icon && iconPosition === 'only' && !loading"
      :icon="getIconName(icon)"
      :class="iconSizeClasses"
    />
  </button>
</template>