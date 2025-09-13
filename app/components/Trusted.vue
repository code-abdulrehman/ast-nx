<script setup>
import AutoScrolling from "./AutoScrolling.vue";
import { useI18n } from '#imports'

// I18n
const { locale } = useI18n()

// Use direction composable for RTL/LTR support
const { htmlAttributes } = useDirection(ref(locale));

// Use the new language data composable
const { trustedData, t, pending, error } = useLanguageData()
const title = computed(() => trustedData.value?.title || 'title')

// Import the icon components directly
import IconAirbnb from "./icon/airbnb.vue";
import IconAmazon from "./icon/amazon.vue";
import IconApple from "./icon/apple.vue";
import IconFacebook from "./icon/facebook.vue";
import IconGoogle from "./icon/goole.vue"; // Note: filename is "goole.vue"
import IconInstagram from "./icon/instagram.vue";
import IconLinkedin from "./icon/linkedin.vue";
import IconMicrosoft from "./icon/microsoft.vue";
import IconPinterest from "./icon/pinterest.vue";
import IconTiktok from "./icon/tiktok.vue";
import IconWhatsapp from "./icon/whatsapp.vue";
import IconYoutube from "./icon/youtube.vue";

const brands = [
    { component: IconAirbnb, props: { class: "h-12 w-12 grayscale hover:grayscale-0 text-gray-700 hover:text-black" } },
    { component: IconAmazon, props: { class: "h-16 w-16 grayscale hover:grayscale-0 relative top-4" } },
    { component: IconApple, props: { class: "h-16 w-16 grayscale hover:grayscale-0 text-gray-700 hover:text-black" } },
    { component: IconFacebook, props: { class: "h-16 w-16 grayscale hover:grayscale-0 hover:text-blue-700" } },
    { component: IconGoogle, props: { class: "h-16 w-16 grayscale hover:grayscale-0" } },
    { component: IconInstagram, props: { class: "h-12 w-12 grayscale hover:grayscale-0 hover:text-pink-500" } },
    { component: IconLinkedin, props: { class: "h-12 w-12 grayscale hover:grayscale-0 hover:text-sky-600" } },
    { component: IconMicrosoft, props: { class: "h-12 w-12 grayscale hover:grayscale-0" } },
    { component: IconPinterest, props: { class: "h-12 w-12 grayscale hover:grayscale-0 hover:text-red-500" } },
    { component: IconTiktok, props: { class: "h-12 w-12 grayscale hover:grayscale-0 hover:text-black" } },
    { component: IconWhatsapp, props: { class: "h-16 w-16 grayscale hover:grayscale-0 hover:text-green-500" } },
    { component: IconYoutube, props: { class: "h-16 w-16 grayscale hover:grayscale-0 hover:text-red-600" } },
];
</script>

<template>
  <!-- Error state -->
  <div v-if="error" class="w-screen bg-red-100 text-red-800 p-4 text-center">
    Error loading trusted brands data: {{ error.message }}
  </div>
  
  <!-- Loading state -->
  <div v-else-if="pending" class="w-screen bg-gray-100 p-4 text-center">
    Loading trusted brands...
  </div>
  
  <!-- Main content -->
  <div v-else class="overflow-hidden mx-auto 2xl:container w-full bg-white py-4 my-2" v-bind="htmlAttributes">
    <!-- Heading -->
    <div
      class="heading text-center py-4 md:py-8 font-extrabold text-2xl md:text-4xl text-gray-300 flex-wrap flex justify-center items-center"
    >
      <p class="max-w-2xl md:w-full mx-auto" >
        {{ t(title) }}
      </p>
    </div>

    <!-- Scrolling brand icons -->
    <div class="relative w-full h-24 trust-list">
      <AutoScrolling
        :items="brands"
        :speed="0.7"
        direction="horizontal"
        :repeatCount="4"
        className="brands-container"
        itemClassName="h-20 space-x-8 md:space-x-12 text-4xl md:text-7xl text-gray-700 gap-8 md:gap-20 flex items-center "
        containerClassName="h-20"
        :pauseOnHover="true"
      />
    </div>
  </div>
</template>
