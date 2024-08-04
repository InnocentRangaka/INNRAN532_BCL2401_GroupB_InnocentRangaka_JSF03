<script setup>
import { watchEffect, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import ProductCards from '../components/ProductCards.vue'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'

const appStore = useAppStore()
const {
  fetchProducts,
  setFilterItem,
  getCategories,
  categories,
  products,
  loading,
  error,
  setPageLoading
} = appStore

// Using vue-router hooks
const route = useRoute()
const router = useRouter()

// console.log(route)

let homeProducts = ref(products)
let productsLoading = ref(loading.products)

const isHomePageShown = () => {
  // Logic to determine if the home page is shown based on the current location
}

const getHomeProducts = () => {
  const path = route.path,
    query = route.query

  // console.log(Object.values(query).length)

  if (Object.values(query).length === 0) {
    setFilterItem('All categories')
  }
  fetchProducts()
}

onMounted(async () => {
  getHomeProducts()
  setTimeout(() => {
    if (appStore.loading.products) {
      appStore.setProductsLoading(false)
    }
    // appStore.setProductsLoading(false)
  }, 1200)
})

// console.log(getCategories)

watchEffect(() => {
  homeProducts
  productsLoading = appStore.loading.products
  appStore.products
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
