<script setup lang="ts">
import { computed, ref } from 'vue'
import IconFacebook from './icon/facebook.vue'
import IconInstagram from './icon/instagram.vue'
import IconLinkedin from './icon/linkedin.vue'
import IconYouTube from './icon/youtube.vue'
import IconTikTok from './icon/tiktok.vue'
import IconWhatsApp from './icon/whatsapp.vue'
import IconTwitter from './icon/twitter.vue'
import Logo from '~/components/Logo.vue'

// Use the new language data composable
const { footerData, t, pending, error } = useLanguageData()

// State
const currentYear = new Date().getFullYear()

// Method to get icon name for custom SVG icons
const getIconName = (iconName: string | undefined) => {
  if (!iconName) return 'svg:default'
  return `svg:${iconName}`
}

// Icon mapping
const iconMap = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedin,
  youtube: IconYouTube,
  tiktok: IconTikTok,
  whatsapp: IconWhatsApp,
  twitter: IconTwitter,
};
</script>

<template>
  <!-- Error state -->
  <div v-if="error" class="w-screen bg-red-100 text-red-800 p-4 text-center">
    Error loading footer data: {{ error.message }}
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
          <span class="text-sm text-gray-600 hidden md:block">{{ t(footerData?.social?.title || 'social.title') }}:</span>
          <div class="flex items-center gap-3">
            <a
              v-for="(social, index) in footerData?.social?.icons"
              :key="index"
              :href="social.link"
              target="_blank"
              rel="noopener"
              class="social-icon-link group"
              :aria-label="social.name"
            >
              <component
                :is="iconMap[social.icon as keyof typeof iconMap]"
                v-if="social.icon"
                class="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:scale-110 transform"
                :class="social.color"
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
          <p class="flex items-center justify-center gap-2 text-xs text-gray-500">
            {{ t(footerData?.copyright?.text || 'copyright.text') }}<Logo className="w-8 h-8" logoSize="w-8 h-8" /> © {{ currentYear }}
          </p>
        </div>

      </div>
    </footer>
  </div>
</template>
