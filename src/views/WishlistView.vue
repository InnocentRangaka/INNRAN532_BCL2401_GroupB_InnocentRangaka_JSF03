<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ProductCards from '../components/products/ProductCards.vue'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton.vue'
import { useAppStore } from '../stores/appStore'

const appStore = useAppStore()

const { fetchFavourites } = appStore
const products = computed(() => appStore.products)
const loading = ref(appStore.loading)
const error = ref(appStore.error)
const wishList = computed(() => appStore.wishList)
const wishListItems = computed(() => appStore.wishList.totalItems)
const wishListIds = computed(() => Object.keys(appStore.wishList.items))

const wishListProducts = () => {
  fetchFavourites(wishListIds.value)
}

onMounted(async () => {
  await wishListProducts()
})

watch(wishListItems, async () => {
  await wishListProducts()
})
</script>

<template>
  <div v-if="wishList.totalItems > 0" class="grid justify-center">
    <div
      v-if="loading.products"
      class="container mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4"
    >
      <ProductCardSkeleton v-for="i in wishListItems" :key="i" />
    </div>
    <div v-else-if="!loading.products && !error">
      <ProductCards :products="products" />
    </div>
  </div>
  <div v-else class="container min-h-full text-center mx-auto pt-20">
    <div class="w-full min-h-full text-center">
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        No item found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find any item in your wishlist.
      </p>
      <div class="mt-10 flex items-center justify-center gap-4">
        <router-link
          to="/"
          class="cursor-pointer rounded-md hover:text-cyan-900 hover:underline py-2.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          <span class="mb-[0.12rem] font-semibold">Continue shopping</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
