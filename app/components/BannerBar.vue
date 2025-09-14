<script setup>
import { ref, computed } from "vue";
import AutoScrolling from "./AutoScrolling.vue";

const props = defineProps({
  variant: {
    type: String,
    default: "colorful",
  },
  announcements: {
    type: Array,
    default: null,
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

// For "close" feature
const isVisible = ref(true);

// Default announcements for each variant
const defaultAnnouncements = {
  minimal: [
    "Free shipping on orders over $50",
    "New arrivals every week",
    "Premium quality guaranteed",
    "Fast delivery in 24-48 hours"
  ],
  colorful: [
    "🎉 Free shipping",
    "🔥 New arrivals every week!",
    "💎 Premium quality guaranteed!",
    "⚡ Fast delivery in 24-48 hours!"
  ],
  business: [
    "Professional Services Available",
    "Enterprise Solutions",
    "24/7 Customer Support",
    "Secure & Reliable Platform"
  ],
  sale: [
    "🔥 MEGA SALE - Up to 70% OFF!",
    "⚡ Limited Time Offer - Don't Miss Out!",
    "🎁 Buy 2 Get 1 FREE - Today Only!",
    "💥 Flash Sale - Ends Tonight!"
  ],
  news: [
    "Breaking: New product launch next week!",
    "Update: Improved shipping times across all regions",
    "News: Partnership with leading brands announced",
    "Alert: System maintenance scheduled for tonight"
  ]
};

const announcementsList = computed(() => {
  return props.announcements || defaultAnnouncements[props.variant] || defaultAnnouncements.colorful;
});

const bannerConfig = computed(() => {
  const configs = {
    minimal: {
      containerClass: "bg-gray-800 text-white py-1 text-center",
      speed: 0.6,
      repeatCount: 3,
      itemClass: "text-xs font-light px-4 text-white",
      containerItemClass: "h-6 flex items-center"
    },
    colorful: {
      containerClass: "text-white py-2 relative overflow-hidden",
      speed: 0.7,
      repeatCount: 3,
      itemClass: "text-sm font-semibold whitespace-nowrap px-6 text-white gap-4",
      containerItemClass: "h-4 flex items-center",
      pauseOnHover: true,
      backgroundStyle: "background: linear-gradient(to right, #9333ea, #ec4899, #dc2626);"
    },
    business: {
      containerClass: "text-white py-1",
      speed: 0.5,
      repeatCount: 2,
      itemClass: "text-sm font-medium whitespace-nowrap px-8 text-white",
      containerItemClass: "h-7 flex items-center",
      backgroundStyle: "background-color: #1e3a8a;"
    },
    sale: {
      containerClass: "text-white py-2 relative overflow-hidden",
      speed: 1,
      repeatCount: 4,
      itemClass: "text-sm font-bold whitespace-nowrap px-6 animate-pulse text-white",
      containerItemClass: "h-8 flex items-center",
      pauseOnHover: true,
      backgroundStyle: "background: linear-gradient(to right, #ef4444, #f97316);"
    },
    news: {
      containerClass: "text-green-400 py-1 font-mono",
      speed: 0.8,
      repeatCount: 3,
      itemClass: "text-xs font-mono whitespace-nowrap px-4 text-green-400",
      containerItemClass: "h-6 flex items-center",
      backgroundStyle: "background-color: #000000;"
    }
  };
  
  return configs[props.variant] || configs.colorful;
});
</script>

<template>
  <div v-if="isVisible" class="relative w-full cursor-default select-none">
    <!-- Minimal Variant -->
    <div v-if="variant === 'minimal'" :class="bannerConfig.containerClass">
      <AutoScrolling
        :items="announcementsList"
        :speed="bannerConfig.speed"
        direction="horizontal"
        :repeatCount="bannerConfig.repeatCount"
        :itemClassName="bannerConfig.itemClass"
        :containerClassName="bannerConfig.containerItemClass"
      />
    </div>

    <!-- Colorful Variant -->
    <div v-else-if="variant === 'colorful'" :class="bannerConfig.containerClass" :style="bannerConfig.backgroundStyle">
      <div class="w-screen mx-auto">
        <AutoScrolling
          :items="announcementsList"
          :speed="bannerConfig.speed"
          direction="horizontal"
          :repeatCount="bannerConfig.repeatCount"
          :itemClassName="bannerConfig.itemClass"
          :containerClassName="bannerConfig.containerItemClass"
          :pauseOnHover="bannerConfig.pauseOnHover"
        />
      </div>
    </div>

    <!-- Business Variant -->
    <div v-else-if="variant === 'business'" :class="bannerConfig.containerClass" :style="bannerConfig.backgroundStyle">
      <div class="container mx-auto px-4">
        <AutoScrolling
          :items="announcementsList"
          :speed="bannerConfig.speed"
          direction="horizontal"
          :repeatCount="bannerConfig.repeatCount"
          :itemClassName="bannerConfig.itemClass"
          :containerClassName="bannerConfig.containerItemClass"
        />
      </div>
    </div>

    <!-- Sale Variant -->
    <div v-else-if="variant === 'sale'" :class="bannerConfig.containerClass" :style="bannerConfig.backgroundStyle">
      <div class="container mx-auto px-4">
        <AutoScrolling
          :items="announcementsList"
          :speed="bannerConfig.speed"
          direction="horizontal"
          :repeatCount="bannerConfig.repeatCount"
          :itemClassName="bannerConfig.itemClass"
          :containerClassName="bannerConfig.containerItemClass"
          :pauseOnHover="bannerConfig.pauseOnHover"
        />
      </div>
      <!-- Animated background elements -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div class="absolute top-0 left-0 w-20 h-full animate-pulse" style="background: linear-gradient(to right, #ef4444, transparent);"></div>
        <div class="absolute top-0 right-0 w-20 h-full animate-pulse" style="background: linear-gradient(to left, #f97316, transparent);"></div>
      </div>
    </div>

    <!-- News Ticker Variant -->
    <div v-else-if="variant === 'news'" :class="bannerConfig.containerClass" :style="bannerConfig.backgroundStyle">
      <div class="container mx-auto px-4">
        <div class="flex items-center">
          <span class="text-green-500 font-bold mr-4">LIVE:</span>
          <AutoScrolling
            :items="announcementsList"
            :speed="bannerConfig.speed"
            direction="horizontal"
            :repeatCount="bannerConfig.repeatCount"
            :itemClassName="bannerConfig.itemClass"
            :containerClassName="bannerConfig.containerItemClass"
          />
        </div>
      </div>
    </div>

    <!-- Default Colorful Variant -->
    <div v-else :class="bannerConfig.containerClass" :style="bannerConfig.backgroundStyle">
      <div class="w-screen mx-auto">
        <AutoScrolling
          :items="announcementsList"
          :speed="bannerConfig.speed"
          direction="horizontal"
          :repeatCount="bannerConfig.repeatCount"
          :itemClassName="bannerConfig.itemClass"
          :containerClassName="bannerConfig.containerItemClass"
          :pauseOnHover="bannerConfig.pauseOnHover"
        />
      </div>
    </div>

    <!-- Close button if closable -->
    <button
      v-if="closable"
      @click="isVisible = false"
      class="absolute top-1 right-2 text-white text-lg font-bold z-10"
      aria-label="Close banner"
    >
      ✕
    </button>
  </div>
</template>
