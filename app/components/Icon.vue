<script setup lang="ts">
import { computed } from 'vue'

// Import all icon components
import IconTruck from './icon/truck.vue'
import IconDiscount from './icon/discount.vue'
import IconWallet from './icon/wallet.vue'
import IconHeadset from './icon/headset.vue'
import IconWarning from './icon/warning.vue'
import IconFacebook from './icon/facebook.vue'
import IconInstagram from './icon/instagram.vue'
import IconLinkedin from './icon/linkedin.vue'
import IconYouTube from './icon/youtube.vue'
import IconTikTok from './icon/tiktok.vue'
import IconWhatsApp from './icon/whatsapp.vue'
import IconTwitter from './icon/twitter.vue'
import IconArrowRight from './icon/arrow-right.vue'
import IconArrowLeft from './icon/arrow-left.vue'
import IconArrowUp from './icon/arrow-up.vue'
import IconBadgeCheck from './icon/badge-check.vue'
import IconBadgePercent from './icon/badge-percent.vue'
import IconBot from './icon/bot.vue'
import IconBox from './icon/box.vue'
import IconBranch from './icon/branch.vue'
import IconCalender from './icon/calender.vue'
import IconChevronLeft from './icon/chevron-left.vue'
import IconChevronRight from './icon/chevron-right.vue'
import IconCustomer24 from './icon/customer-24.vue'
import IconDimond from './icon/dimond.vue'
import IconEllipsisVertical from './icon/ellipsis-vertical.vue'
import IconFeature from './icon/feature.vue'
import IconGamePad from './icon/game-pad.vue'
import IconGift from './icon/gift.vue'
import IconGoole from './icon/goole.vue'
import IconHeart from './icon/heart.vue'
import IconHide from './icon/hide.vue'
import IconImage from './icon/image.vue'
import IconLatest from './icon/latest.vue'
import IconList from './icon/list.vue'
import IconLocation from './icon/location.vue'
import IconLock from './icon/lock.vue'
import IconMark from './icon/mark.vue'
import IconMessage from './icon/message.vue'
import IconMicrosoft from './icon/microsoft.vue'
import IconNuxt from './icon/nuxt.vue'
import IconOpenBox from './icon/open-box.vue'
import IconPen from './icon/pen.vue'
import IconPin from './icon/pin.vue'
import IconPinterest from './icon/pinterest.vue'
import IconProduct from './icon/product.vue'
import IconReviews from './icon/reviews.vue'
import IconSearch from './icon/search.vue'
import IconSpecifications from './icon/specifications.vue'
import IconStarFill from './icon/star-fill.vue'
import IconStarHalfFill from './icon/star-half-fill.vue'
import IconStart from './icon/start.vue'
import IconStore from './icon/store.vue'
import IconTada from './icon/tada.vue'
import IconTag from './icon/tag.vue'
import IconTextAa from './icon/text-aa.vue'
import IconTextWFill from './icon/text-w-fill.vue'
import IconTranslate from './icon/translate.vue'
import IconTrush from './icon/trush.vue'
import IconUpload from './icon/upload.vue'
import IconUser from './icon/user.vue'
import IconView from './icon/view.vue'
import IconXmark from './icon/xmark.vue'
import IconAirbnb from './icon/airbnb.vue'
import IconAmazon from './icon/amazon.vue'
import IconApple from './icon/apple.vue'
import IconGoogle from './icon/goole.vue'
import IconLoading from './icon/loading.vue'

// Props
const props = defineProps({
  // Icon name - matches the icon file names
  name: {
    type: String,
    required: true,
    validator: (value: string) => {
      const validIcons = [
        'truck', 'discount', 'wallet', 'headset', 'warning',
        'facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'twitter',
        'arrow-right', 'arrow-up', 'badge-check', 'badge-percent', 'bot', 'box', 'branch',
        'calender', 'chevron-left', 'chevron-right', 'customer-24', 'dimond', 'ellipsis-vertical',
        'feature', 'game-pad', 'gift', 'goole', 'heart', 'hide', 'image', 'latest', 'list',
        'location', 'lock', 'mark', 'message', 'microsoft', 'nuxt', 'open-box', 'pen', 'pin',
        'pinterest', 'product', 'reviews', 'search', 'specifications',         'star-fill', 'star-half-fill',
        'start', 'store', 'tada', 'tag', 'text-aa', 'text-w-fill', 'translate', 'trush', 'upload',
        'user', 'view', 'xmark', 'airbnb', 'amazon', 'apple', 'loading'
      ]
      return validIcons.includes(value)
    }
  },
  // Icon size
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  // Custom classes
  customClass: {
    type: String,
    default: ''
  },
  // Color classes
  color: {
    type: String,
    default: ''
  }
})

// Icon mapping
const iconMap = {
  // Services icons
  truck: IconTruck,
  discount: IconDiscount,
  wallet: IconWallet,
  headset: IconHeadset,
  warning: IconWarning,
  
  // Social media icons
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedin,
  youtube: IconYouTube,
  tiktok: IconTikTok,
  whatsapp: IconWhatsApp,
  twitter: IconTwitter,
  
  // Navigation and UI icons
  'arrow-right': IconArrowRight,
  'arrow-left': IconArrowLeft,
  'arrow-up': IconArrowUp,
  'badge-check': IconBadgeCheck,
  'badge-percent': IconBadgePercent,
  bot: IconBot,
  box: IconBox,
  branch: IconBranch,
  calender: IconCalender,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'customer-24': IconCustomer24,
  dimond: IconDimond,
  'ellipsis-vertical': IconEllipsisVertical,
  feature: IconFeature,
  'game-pad': IconGamePad,
  gift: IconGift,
  goole: IconGoole,
  heart: IconHeart,
  hide: IconHide,
  image: IconImage,
  latest: IconLatest,
  list: IconList,
  location: IconLocation,
  lock: IconLock,
  mark: IconMark,
  message: IconMessage,
  microsoft: IconMicrosoft,
  nuxt: IconNuxt,
  'open-box': IconOpenBox,
  pen: IconPen,
  pin: IconPin,
  pinterest: IconPinterest,
  product: IconProduct,
  reviews: IconReviews,
  search: IconSearch,
  specifications: IconSpecifications,
  'star-fill': IconStarFill,
  'star-half-fill': IconStarHalfFill,
  start: IconStart,
  store: IconStore,
  tada: IconTada,
  tag: IconTag,
  'text-aa': IconTextAa,
  'text-w-fill': IconTextWFill,
  translate: IconTranslate,
  trush: IconTrush,
  upload: IconUpload,
  user: IconUser,
  view: IconView,
  xmark: IconXmark,
  
  // Brand icons
  airbnb: IconAirbnb,
  amazon: IconAmazon,
  apple: IconApple,
  
  // Loading icon
  loading: IconLoading
}

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
    '3xl': 'w-12 h-12'
  }
  return sizes[props.size as keyof typeof sizes] || sizes.md
})

// Get the icon component
const iconComponent = computed(() => {
  return iconMap[props.name as keyof typeof iconMap]
})

// Combined classes
const combinedClasses = computed(() => {
  return [
    sizeClasses.value,
    props.color,
    props.customClass
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="combinedClasses"
    v-bind="$attrs"
  />
  <div
    v-else
    :class="combinedClasses"
    class="flex items-center justify-center bg-gray-200 rounded"
  >
    <span class="text-xs text-gray-500">?</span>
  </div>
</template>
