<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ProductCards from '../components/products/ProductCards.vue'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton.vue'
import NoItemFound from '../components/includes/NoItemFound.vue'
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
  <NoItemFound v-else name="wishlist" />
</template>
