<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6" :class="textAlign">
      {{ t('example.title') }}
    </h1>

    <!-- Basic Direction Demo -->
    <div class="bg-gray-100 p-4 rounded-lg mb-6" :dir="textDirection">
      <h2 class="text-xl font-semibold mb-3" :class="textAlign">
        {{ t('example.direction_demo') }}
      </h2>
      <p class="mb-4" :class="textAlign">
        {{ t('example.description') }}
      </p>
      
      <!-- Form Example using composable utilities -->
      <form class="space-y-4" :dir="textDirection">
        <div>
          <label class="block text-sm font-medium mb-2" :class="textAlign">
            {{ t('example.name_label') }}
          </label>
          <div class="relative">
            <input
              type="text"
              :placeholder="t('example.name_placeholder')"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              :class="[textAlign, inputPadding.withIcon]"
              :dir="textDirection"
            />
            <div 
              class="absolute inset-y-0 flex items-center"
              :class="iconPosition.left"
            >
              <IconUser class="w-4 h-4 text-gray-400" />
            </div>
          </div>
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
        
        <!-- Button group using flexDirection -->
        <div class="flex gap-3" :class="flexDirection">
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
        <div class="flex items-center gap-2" :class="flexDirection">
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
      <ul class="flex gap-4" :class="flexDirection">
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

    <!-- Icon Examples -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4" :class="textAlign">
        {{ t('example.icon_demo') }}
      </h3>
      <div class="flex gap-4 items-center" :class="flexDirection">
        <div class="flex items-center gap-2">
          <IconArrowRight class="w-5 h-5" :class="iconRotation" />
          <span :class="textAlign">{{ t('example.arrow_demo') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <IconChevronRight class="w-5 h-5" :class="iconRotation" />
          <span :class="textAlign">{{ t('example.chevron_demo') }}</span>
        </div>
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="text-center">
      <LanguageSwitcher :is-scrolled="false" />
    </div>

    <!-- Direction Info -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-semibold mb-2" :class="textAlign">
        {{ t('example.current_direction') }}
      </h4>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>{{ t('example.direction') }}:</strong> {{ textDirection }}
        </div>
        <div>
          <strong>{{ t('example.language') }}:</strong> {{ currentLocale }}
        </div>
        <div>
          <strong>{{ t('example.is_rtl') }}:</strong> {{ isRTL }}
        </div>
        <div>
          <strong>{{ t('example.alignment') }}:</strong> {{ textAlign }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'

// I18n
const { locale } = useI18n()

// Direction utilities - using the global composable
const {
  textDirection,
  textAlign,
  isRTL,
  flexDirection,
  inputPadding,
  iconPosition,
  iconRotation,
  htmlAttributes
} = useDirection(locale)

// Mock translation function (replace with your actual i18n setup)
const t = (key: string) => {
  const translations: Record<string, Record<string, string>> = {
    'example.title': {
      en: 'Global Direction Composable Demo',
      ar: 'عرض مركب الاتجاه العالمي',
      ur: 'عالمی سمت کمپوزیبل ڈیمو'
    },
    'example.direction_demo': {
      en: 'Direction Composable Demo',
      ar: 'عرض مركب الاتجاه',
      ur: 'سمت کمپوزیبل ڈیمو'
    },
    'example.description': {
      en: 'This example demonstrates the global useDirection composable. All direction utilities are now centralized and reusable across your entire application.',
      ar: 'يُظهر هذا المثال مركب useDirection العالمي. جميع أدوات الاتجاه مركزية الآن وقابلة لإعادة الاستخدام عبر تطبيقك بالكامل.',
      ur: 'یہ مثال عالمی useDirection کمپوزیبل کو دکھاتا ہے۔ تمام سمت کے اوزار اب مرکزی ہیں اور آپ کی پوری ایپلیکیشن میں دوبارہ استعمال کے قابل ہیں۔'
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
      en: 'This card demonstrates how the composable handles layout direction automatically.',
      ar: 'تُظهر هذه البطاقة كيف يتعامل المركب مع اتجاه التخطيط تلقائياً.',
      ur: 'یہ کارڈ دکھاتا ہے کہ کمپوزیبل لی آؤٹ کی سمت کو کیسے خودکار طور پر ہینڈل کرتا ہے۔'
    },
    'example.card_2_title': {
      en: 'Feature Two',
      ar: 'الميزة الثانية',
      ur: 'دوسری خصوصیت'
    },
    'example.card_2_content': {
      en: 'All direction utilities are now centralized in one composable for easy reuse.',
      ar: 'جميع أدوات الاتجاه مركزية الآن في مركب واحد لإعادة الاستخدام السهل.',
      ur: 'تمام سمت کے اوزار اب آسان دوبارہ استعمال کے لیے ایک کمپوزیبل میں مرکزی ہیں۔'
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
    },
    'example.icon_demo': {
      en: 'Icon Direction Demo',
      ar: 'عرض اتجاه الأيقونات',
      ur: 'آئیکن سمت ڈیمو'
    },
    'example.arrow_demo': {
      en: 'Arrow rotates in RTL',
      ar: 'السهم يدور في RTL',
      ur: 'تیر RTL میں گھومتا ہے'
    },
    'example.chevron_demo': {
      en: 'Chevron adapts to direction',
      ar: 'الشيفرون يتكيف مع الاتجاه',
      ur: 'شیورون سمت کے مطابق ڈھل جاتا ہے'
    },
    'example.current_direction': {
      en: 'Current Direction Settings',
      ar: 'إعدادات الاتجاه الحالية',
      ur: 'موجودہ سمت کی ترتیبات'
    },
    'example.direction': {
      en: 'Direction',
      ar: 'الاتجاه',
      ur: 'سمت'
    },
    'example.language': {
      en: 'Language',
      ar: 'اللغة',
      ur: 'زبان'
    },
    'example.is_rtl': {
      en: 'Is RTL',
      ar: 'هل هو RTL',
      ur: 'RTL ہے'
    },
    'example.alignment': {
      en: 'Alignment',
      ar: 'المحاذاة',
      ur: 'ترتیب'
    }
  }
  
  const currentLocale = locale.value || 'en'
  return translations[key]?.[currentLocale] || translations[key]?.['en'] || key
}

// Mock data
const cards = [1, 2]
const navItems = [1, 2, 3, 4]
const currentLocale = computed(() => locale.value || 'en')
</script>
