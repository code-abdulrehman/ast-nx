<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useLanguageData } from "~/composables/useLanguageData";
// Props for flexibility
const props = defineProps({
  futureDate: {
    type: String,
    default: "2025-09-25T23:59:59", // yyyy-mm-ddThh:mm:ss
  },
});

const { t, productsData } = useLanguageData();
const timeLeft = ref(calculateTimeLeft(props.futureDate));
let timerId = null;

// Function to calculate remaining time
function calculateTimeLeft(futureDate) {
  const difference = new Date(futureDate) - new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

// Pad helper
const pad = (num) => String(num).padStart(2, "0");

// Derived: check if expired
const isExpired = () =>
  timeLeft.value.days === 0 &&
  timeLeft.value.hours === 0 &&
  timeLeft.value.minutes === 0 &&
  timeLeft.value.seconds === 0;

// Lifecycle
onMounted(() => {
  timerId = setInterval(() => {
    timeLeft.value = calculateTimeLeft(props.futureDate);
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timerId);
});
</script>

<template>
  <div
    class="container my-3 p-4 mx-auto border-2 border-dashed border-gray-200 mb-1 rounded-lg text-md md:text-lg lg:text-xl"
  >
    <div class="timer-heading flex justify-evenly sm:justify-between items-center">
      <div class="div flex justify-between items-center gap-12">
        <!-- Heading -->
        <div class="heading font-medium text-primary hidden md:block relative">
          {{ t(productsData?.onSale || 'products.onSale') }}
        </div>

        <!-- Timer -->
        <div class="timer-ends flex justify-evenly items-center gap-4 text-white">
          <span class="text-black hidden sm:flex">{{ t(productsData?.endingIn || 'products.endingIn') }}</span>
          <span>
            <div class="timer flex items-center gap-2" dir="ltr">
              <div
                class="w-10 p-2 bg-primary rounded-md flex justify-center items-center shadow-md"
              >
                {{ pad(timeLeft.days) }}
              </div>
              <span class="text-black">:</span>
              <div
                class="w-10 p-2 bg-primary rounded-md flex justify-center items-center shadow-md"
              >
                {{ pad(timeLeft.hours) }}
              </div>
              <span class="text-black">:</span>
              <div
                class="w-10 p-2 bg-primary rounded-md flex justify-center items-center shadow-md"
              >
                {{ pad(timeLeft.minutes) }}
              </div>
              <span class="text-black">:</span>
              <div
                class="w-10 p-2 bg-primary rounded-md flex justify-center items-center shadow-md"
              >
                {{ pad(timeLeft.seconds) }}
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>

    <!-- Expired Message -->
    <div class="text-center">
      <span
        v-if="isExpired()"
        class="text-red-600 font-semibold block mt-2"
      >
        {{ t(productsData?.offerExpired || 'products.offerExpired') }}
      </span>
    </div>
  </div>
</template>
