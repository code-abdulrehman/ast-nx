<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Dropdown Button -->
    <button
      aria-label="ast-data-dropdown"
      @click="toggleDropdown"
      type="button"
      class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-200"
      :class="buttonClass"
    >
      <span class="mr-2">{{ selectedOption?.icon || selectedOption?.label }}</span>
      <span class="text-gray-700">{{ selectedOption?.label }}</span>
      <svg 
        class="ml-2 w-4 h-4 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none"
        :class="dropdownPosition"
      >
        <div role="menu" aria-orientation="vertical">
          <button
          aria-label="ast-data-options"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            class="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-primary hover:text-gray-900 transition-colors duration-150 border border-gray-300 rounded-md"
            :class="[
              option.class || '',
              selectedOption?.value === option.value ? 'bg-primary text-gray-900' : ''
            ]"
            role="menuitem"
          >
            <span v-if="option.icon" class="mr-3 text-lg">{{ option.icon }}</span>
            <span class="flex-1 text-left">{{ option.label }}</span>
            <svg 
              v-if="selectedOption?.value === option.value"
              class="w-4 h-4 text-primary"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface DropdownOption {
  label: string
  value: string | number
  icon?: string
  class?: string
}

interface Props {
  options: DropdownOption[]
  modelValue?: string | number
  placeholder?: string
  buttonClass?: string
  menuClass?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', option: DropdownOption): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  buttonClass: '',
  menuClass: '',
  disabled: false
})

const emit = defineEmits<Emits>()

// Reactive state
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

// Computed properties
const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || null
})

// Smart positioning based on available space
const dropdownPosition = computed(() => {
  if (!dropdownRef.value) return 'right-0 origin-top-right'
  
  const rect = dropdownRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  
  // Check if there's enough space below
  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top
  
  // Check if there's enough space on the right
  const spaceRight = viewportWidth - rect.right
  const spaceLeft = rect.left
  
  // Determine vertical position
  const verticalPosition = spaceBelow < 200 && spaceAbove > spaceBelow ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'
  
  // Determine horizontal position
  const horizontalPosition = spaceRight < 200 && spaceLeft > spaceRight ? 'right-0' : 'left-0'
  
  return `${horizontalPosition} ${verticalPosition}`
})

// Methods
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value)
  emit('change', option)
  isOpen.value = false
}

// Click outside to close
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for external changes
watch(() => props.modelValue, () => {
  // Optionally handle external value changes
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
