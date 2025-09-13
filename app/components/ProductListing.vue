<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductCard from "./ProductCard.vue";
import Services from "./Services.vue";
import { useQuickData } from '~/composables/useLanguageSnippets'

// Props: pass products from parent or store
const props = defineProps({
  featureProducts: { type: Array, default: () => [] },
  products: { type: Array, default: () => [] },
});

const route = useRoute();
const router = useRouter();

// Language data
const { 
  featuredProducts, 
  gamingProducts: gamingProductsText, 
  gamingDescription,
  allProducts: allProductsText,
  searchResults,
  results,
  found,
  noProducts,
  trySearching,
  viewAllProducts
} = useQuickData()

const filteredProducts = ref([...(props.featureProducts || [])]);
const allProducts = ref([...(props.products || [])]);
const gamingProducts = ref([]);

// Offer timer → 2 days from now
const offerEndTime = new Date();
offerEndTime.setDate(offerEndTime.getDate() + 2);

// Watch route query for search
watch(
  () => route.query.search,
  (searchQuery) => {
    // Reset featured
    filteredProducts.value = [...(props.featureProducts || [])];

    // Gaming products
    gamingProducts.value = (props.products || []).filter(
      (p) => p.mood === "Gaming"
    );

    if (searchQuery && searchQuery.trim() !== "") {
      const searchTerm = searchQuery.toLowerCase().trim();

      const filteredAll = (props.products || []).filter((product) => {
        const searchableText = [
          product.title,
          product.description,
          product.category,
          ...(product.keywords || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerm);
      });

      allProducts.value = filteredAll;
    } else {
      allProducts.value = [...(props.products || [])];
    }
  },
  { immediate: true }
);

const searchQuery = computed(() => route.query.search);

const handleSeeAll = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <div>
    <!-- Featured Products -->
    <div class="container mx-auto p-4 py-6">
      <div class="heading">
        <OfferTimer :endTime="offerEndTime" />
      </div>

      <h2
        class="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2"
      >
        <i v-if="!searchQuery" class="fa-solid fa-gift text-primary"></i>
        {{ featuredProducts }}
      </h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="p in filteredProducts"
          :key="p.product_id"
          :product="p"
        />
      </div>
    </div>

    <Services />

    <!-- Gaming Products -->
    <div
      v-if="gamingProducts.length > 0 && !searchQuery"
      class="container mx-auto p-4 py-6 rounded-lg"
    >
      <div class="text-center mb-6">
        <h2
          class="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-gamepad text-primary"></i>
          {{ gamingProductsText }}
        </h2>
        <p class="text-gray-600 text-sm">
          {{ gamingDescription }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="p in gamingProducts"
          :key="p.product_id"
          :product="p"
        />
      </div>
    </div>

    <!-- All Products / Search -->
    <div class="container mx-auto p-4 py-6" id="store">
      <h2
        class="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2"
      >
        <i v-if="!searchQuery" class="fa-solid fa-box-open text-primary"></i>
        <template v-if="searchQuery">
          {{ searchResults }} "{{ searchQuery }}" ({{ allProducts.length }} {{ found }})
        </template>
        <template v-else>{{ allProductsText }}</template>
      </h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="p in allProducts"
          :key="p.product_id"
          :product="p"
        />
      </div>

      <!-- No results -->
      <div v-if="allProducts.length === 0 && searchQuery" class="text-center py-8">
        <div class="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
          <i class="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600 text-lg mb-2">{{ noProducts }}</p>
          <p class="text-gray-800 font-semibold">"{{ searchQuery }}"</p>
          <p class="text-gray-500 text-sm mt-2">
            {{ trySearching }}
          </p>
        </div>
      </div>

      <!-- See All -->
      <div
        v-if="searchQuery && allProducts.length > 0"
        class="text-center py-6"
      >
        <button
          @click="handleSeeAll"
          class="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
        >
          <i class="fa-solid fa-list"></i>
          {{ viewAllProducts }}
        </button>
      </div>
    </div>
  </div>
</template>
