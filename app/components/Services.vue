<script setup>
import IconTruck from './icon/truck.vue';
import IconDiscount from './icon/discount.vue';
import IconWallet from './icon/wallet.vue';
import IconHeadset from './icon/headset.vue';
import { useI18n } from '#imports'

// I18n
const { locale } = useI18n()

// Use direction composable for RTL/LTR support
const { textAlign, htmlAttributes } = useDirection(ref(locale));

// Use the new language data composable
const { servicesData, t, pending, error } = useLanguageData()
const title = computed(() => servicesData.value?.title || 'title')
const items = computed(() => servicesData.value?.items || [])

// Icon mapping
const iconMap = {
  truck: IconTruck,
  discount: IconDiscount,
  wallet: IconWallet,
  headset: IconHeadset,
};

</script>

<template>
  <section class="bg-primary" v-bind="htmlAttributes">
    <!-- Section Title -->
    <!-- <div class="text-center py-3 md:py-6 flex justify-center items-center">
      <h2 class="text-2xl md:text-3xl font-bold text-white" :class="textAlign">
        {{ t(title) }}
      </h2>
    </div> -->
    
    <div
      class="grid px-4 py-4 md:py-8 container mx-auto grid-cols-auto sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
    >
      <div
        v-for="(service, idx) in items"
        :key="idx"
        class="p-2 flex flex-col justify-center items-center gap-2 hover:scale-105 cursor-default transition-all duration-100"
      >
        <component :is="iconMap[service.icon]" class="font-bold text-white w-10 h-10 p-1" />
        <div class="flex flex-col justify-center items-center">
          <h3 class="text-lg font-bold text-white text-center" :class="textAlign">
            {{ service.title }}
          </h3>
          <p class="text-gray-100 text-md text-center" :class="textAlign">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
