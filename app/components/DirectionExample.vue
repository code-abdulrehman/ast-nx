<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6" :class="textAlign">
      {{ t('example.title') }}
    </h1>

    <!-- Text Direction Demo -->
    <div class="bg-gray-100 p-4 rounded-lg mb-6" :dir="textDirection">
      <h2 class="text-xl font-semibold mb-3" :class="textAlign">
        {{ t('example.direction_demo') }}
      </h2>
      <p class="mb-4" :class="textAlign">
        {{ t('example.description') }}
      </p>
      
      <!-- Form Example -->
      <form class="space-y-4" :dir="textDirection">
        <div>
          <label class="block text-sm font-medium mb-2" :class="textAlign">
            {{ t('example.name_label') }}
          </label>
          <input
            type="text"
            :placeholder="t('example.name_placeholder')"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            :class="textAlign"
            :dir="textDirection"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2" :class="textAlign">
            {{ t('example.message_label') }}
          </label>
          <textarea
            :placeholder="t('example.message_placeholder')"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            :class="textAlign"
            :dir="textDirection"
          ></textarea>
        </div>
        
        <div class="flex gap-3" :class="textDirection === 'rtl' ? 'flex-row-reverse' : ''">
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {{ t('example.submit_button') }}
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {{ t('example.cancel_button') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Card Layout Example -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div 
        v-for="(card, index) in cards" 
        :key="index"
        class="bg-white p-6 rounded-lg shadow-md border"
        :dir="textDirection"
      >
        <h3 class="text-lg font-semibold mb-3" :class="textAlign">
          {{ t(`example.card_${index + 1}_title`) }}
        </h3>
        <p class="text-gray-600 mb-4" :class="textAlign">
          {{ t(`example.card_${index + 1}_content`) }}
        </p>
        <div class="flex items-center gap-2" :class="textDirection === 'rtl' ? 'flex-row-reverse' : ''">
          <IconStarFill class="w-4 h-4 text-yellow-400" />
          <span class="text-sm text-gray-500">4.8</span>
          <span class="text-sm text-gray-500" :class="textAlign">
            {{ t('example.rating') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Navigation Example -->
    <nav class="bg-white p-4 rounded-lg shadow-md mb-6" :dir="textDirection">
      <ul class="flex gap-4" :class="textDirection === 'rtl' ? 'flex-row-reverse' : ''">
        <li v-for="(item, index) in navItems" :key="index">
          <a
            href="#"
            class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="textAlign"
          >
            {{ t(`example.nav_${index + 1}`) }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Language Switcher -->
    <div class="text-center">
      <LanguageSwitcher :is-scrolled="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'

// I18n
const { locale } = useI18n()

// Mock translation function (replace with your actual i18n setup)
const t = (key: string) => {
  const translations: Record<string, Record<string, string>> = {
    'example.title': {
      en: 'Direction Support Example',
      ar: 'مثال على دعم الاتجاه',
      ur: 'سمت کی حمایت کی مثال'
    },
    'example.direction_demo': {
      en: 'Text Direction Demo',
      ar: 'عرض اتجاه النص',
      ur: 'متن کی سمت کا ڈیمو'
    },
    'example.description': {
      en: 'This example shows how text direction changes based on the selected language. Notice how the layout adapts to RTL (Right-to-Left) languages like Arabic and Urdu.',
      ar: 'يُظهر هذا المثال كيف يتغير اتجاه النص بناءً على اللغة المحددة. لاحظ كيف يتكيف التخطيط مع اللغات من اليمين إلى اليسار مثل العربية والأردية.',
      ur: 'یہ مثال دکھاتا ہے کہ منتخب زبان کی بنیاد پر متن کی سمت کیسے بدلتی ہے۔ نوٹ کریں کہ لی آؤٹ عربی اور اردو جیسی RTL (دائیں سے بائیں) زبانوں کے لیے کیسے ڈھل جاتا ہے۔'
    },
    'example.name_label': {
      en: 'Name',
      ar: 'الاسم',
      ur: 'نام'
    },
    'example.name_placeholder': {
      en: 'Enter your name',
      ar: 'أدخل اسمك',
      ur: 'اپنا نام درج کریں'
    },
    'example.message_label': {
      en: 'Message',
      ar: 'الرسالة',
      ur: 'پیغام'
    },
    'example.message_placeholder': {
      en: 'Type your message here...',
      ar: 'اكتب رسالتك هنا...',
      ur: 'یہاں اپنا پیغام ٹائپ کریں...'
    },
    'example.submit_button': {
      en: 'Submit',
      ar: 'إرسال',
      ur: 'جمع کریں'
    },
    'example.cancel_button': {
      en: 'Cancel',
      ar: 'إلغاء',
      ur: 'منسوخ کریں'
    },
    'example.card_1_title': {
      en: 'Feature One',
      ar: 'الميزة الأولى',
      ur: 'پہلی خصوصیت'
    },
    'example.card_1_content': {
      en: 'This is the first feature card with some descriptive text.',
      ar: 'هذه هي بطاقة الميزة الأولى مع بعض النص الوصفي.',
      ur: 'یہ پہلی خصوصیت کارڈ ہے جس میں کچھ وضاحتی متن ہے۔'
    },
    'example.card_2_title': {
      en: 'Feature Two',
      ar: 'الميزة الثانية',
      ur: 'دوسری خصوصیت'
    },
    'example.card_2_content': {
      en: 'This is the second feature card with more descriptive content.',
      ar: 'هذه هي بطاقة الميزة الثانية مع محتوى وصفي أكثر.',
      ur: 'یہ دوسری خصوصیت کارڈ ہے جس میں مزید وضاحتی مواد ہے۔'
    },
    'example.rating': {
      en: 'rating',
      ar: 'تقييم',
      ur: 'ریٹنگ'
    },
    'example.nav_1': {
      en: 'Home',
      ar: 'الرئيسية',
      ur: 'ہوم'
    },
    'example.nav_2': {
      en: 'About',
      ar: 'حول',
      ur: 'کے بارے میں'
    },
    'example.nav_3': {
      en: 'Services',
      ar: 'الخدمات',
      ur: 'خدمات'
    },
    'example.nav_4': {
      en: 'Contact',
      ar: 'اتصل',
      ur: 'رابطہ'
    }
  }
  
  const currentLocale = locale.value || 'en'
  return translations[key]?.[currentLocale] || translations[key]?.['en'] || key
}

// Computed properties for direction
const textDirection = computed(() => {
  const currentLocale = locale.value || 'en'
  const rtlLanguages = ['ar', 'ur', 'he', 'fa', 'ku']
  return rtlLanguages.includes(currentLocale) ? 'rtl' : 'ltr'
})

const textAlign = computed(() => {
  const currentLocale = locale.value || 'en'
  const rtlLanguages = ['ar', 'ur', 'he', 'fa', 'ku']
  return rtlLanguages.includes(currentLocale) ? 'text-right' : 'text-left'
})

// Mock data
const cards = [1, 2]
const navItems = [1, 2, 3, 4]
</script>
