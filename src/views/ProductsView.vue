<script setup>
import { watchEffect, ref, onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import ProductCards from '../components/ProductCards.vue'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'

const appStore = useAppStore()
const { fetchProducts, getCategories, categories, products, loading, error, setPageLoading } =
  appStore

let homeProducts = ref(products)
let productsLoading = ref(loading.products)

let getLocation = window.location.href
  .replace(window.location.origin, '')
  .replace(window.location.pathname, '')
let categoryParams = app.currentLocation?.params?.category
let categoryPath = app.currentLocation?.path.replace('/products/category/', '')

onMounted(async () => {
  // fetchProducts()
  setTimeout(() => {
    // appStore.setPageLoading(false)
    // appStore.setProductsLoading(false)
  }, 1000)
})

// console.log(getCategories)

watchEffect(() => {
  ;() => homeProducts, () => productsLoading
})
</script>

<template>
  <div class="grid justify-center">
    <!-- Show skeleton loading cards while products are loading -->
    <div
      v-if="appStore.loading.products"
      class="container lg:max-h-[130rem] mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4 px-2 md:px-0"
    >
      <ProductCardSkeleton v-for="i in 20" :key="i" />
    </div>
    <!-- Show product cards when products are loaded and no error -->
    <!-- <ProductCards v-if="!appStore.loading.products" /> -->
    <ProductCards />
  </div>
</template>
