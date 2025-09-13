<script setup>
import { ref, onMounted, onBeforeUnmount, computed, h, resolveComponent } from "vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  speed: { type: Number, default: 0.7 },
  direction: { type: String, default: "horizontal" }, // can extend for vertical later
  repeatCount: { type: Number, default: 4 },
  className: { type: String, default: "" },
  itemClassName: { type: String, default: "" },
  containerClassName: { type: String, default: "" },
  pauseOnHover: { type: Boolean, default: true }
});

const containerRef = ref(null);
const contentRef = ref(null);
const isPaused = ref(false);

// If the items array contains VNodes (e.g. JSX or h()), we just render them as is.
// If the items array contains objects like {component: 'IconAirbnb', props: {class: "..."}}, we resolve and render.
// If the items array contains strings, we handle as before.
const loopItems = computed(() => {
  return Array.from({ length: props.repeatCount }, () => props.items).flat();
});

let animationId = null;

onMounted(() => {
  if (!containerRef.value || !contentRef.value) return;

  // Wait for DOM to be fully rendered
  setTimeout(() => {
    const content = contentRef.value;
    if (!content) return;
    
    const contentWidth = content.scrollWidth / props.repeatCount;
    let currentOffset = 0;

    const animate = () => {
      if (isPaused.value) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      currentOffset += props.speed;

      // Reset when we've scrolled one full cycle
      if (currentOffset >= contentWidth) {
        currentOffset = 0;
      }

      if (content) {
        content.style.transform = `translateX(-${currentOffset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
  }, 100);
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});

const handleMouseEnter = () => {
  if (props.pauseOnHover) isPaused.value = true;
};

const handleMouseLeave = () => {
  if (props.pauseOnHover) isPaused.value = false;
};

// Helper to check if an object is a VNode (e.g. from JSX or h())
function isVNode(obj) {
  return obj && typeof obj === "object" && obj.__v_isVNode === true;
}

</script>

<template>
  <div :class="['auto-scrolling-container', props.className]">
    <div
      ref="containerRef"
      :class="['w-full overflow-hidden relative', props.containerClassName]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        ref="contentRef"
        :class="[
          'auto-scrolling-list flex items-center list-none',
          props.itemClassName
        ]"
        style="transition: none; width: max-content; display: flex; flex-direction: row; will-change: transform;"
      >
        <div
          v-for="(item, idx) in loopItems"
          :key="`${idx}-${typeof item === 'object' && item && item.type ? item.type.name || item.type : item}`"
          :class="['flex-shrink-0 justify-center items-center flex', props.itemClassName]"
        >
          <!-- If item is a VNode (JSX/h()), render as is -->
          <template v-if="isVNode(item)">
            <component :is="item" />
          </template>
          <!-- If item is a string, handle as icon class or text -->
          <template v-else-if="typeof item === 'string'">
            <i v-if="item.startsWith('fa-')" :class="item"></i>
            <span v-else>{{ item }}</span>
          </template>
          <!-- If item is an object with a 'component' property, resolve and render -->
          <template v-else-if="item && typeof item === 'object' && item.component">
            <component :is="typeof item.component === 'string' ? resolveComponent(item.component) : item.component" v-bind="item.props || {}" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auto-scrolling-container {
  display: block;
}
</style>
