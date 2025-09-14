<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from './Icon.vue'
import Logo from '~/components/Logo.vue'
import CurrencySelector from '~/components/CurrencySelector.vue'

// Use the new language data composable
const { footerData, t, pending, error } = useLanguageData()

// State
const currentYear = new Date().getFullYear()
</script>

<template>
  <!-- Error state -->
  <div v-if="error" class="w-screen bg-red-100 text-red-800 p-4 text-center">
    Error loading footer data: {{ error }}
  </div>
  
  <!-- Loading state -->
  <div v-else-if="pending" class="w-screen bg-gray-100 p-4 text-center">
    Loading footer...
  </div>
  
  <!-- Main footer -->
  <div v-else class="w-screen bg-gray-100">
    <footer class="footer-area bg-gray-100 container mx-auto p-4">
      <!-- Compact Footer Content -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <!-- Left: Social Media Icons -->
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 hidden md:block">{{ t((footerData as any)?.social?.title || 'social.title') }}:</span>
          <div class="flex items-center gap-3">
            <a
              v-for="(social, index) in (footerData as any)?.social?.icons"
              :key="index"
              :href="social.link"
              target="_blank"
              rel="noopener"
              class="social-icon-link group"
              :aria-label="social.name"
            >
              <Icon
                v-if="social.icon"
                :name="social.icon"
                size="md"
                color="text-gray-600 transition-all duration-300 group-hover:scale-110 transform"
                :custom-class="social.color"
              />
              <div
                v-else
                class="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:scale-110 transform"
                :class="social.color"
              >
                {{ social.name?.charAt(0) }}
              </div>
            </a>
          </div>
        </div>

        <!-- Center: Copyright -->
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>{{ t(footerData?.copyright?.text || 'copyright.text') }}</span><Logo className="w-8 h-8" logoSize="w-8 h-8" /> <span> © {{ currentYear }}</span>
          </div>
        </div>

        <!-- <div class="flex items-center gap-3">
          <CurrencySelector />
        </div> -->

      </div>
    </footer>
  </div>
</template>
