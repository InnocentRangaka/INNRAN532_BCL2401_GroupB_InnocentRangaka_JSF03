<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCards from '../components/products/ProductCards.vue'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton.vue'
import { useAppStore } from '../stores/appStore'

const appStore = useAppStore()
const { fetchProducts, products, loading } = appStore

// Using vue-router hooks
const route = useRoute()
const router = useRouter()

// console.log(route)

let homeProducts = ref(products)
let productsLoading = ref(loading.products)
const currentQuery = computed(() => appStore.currentLocation.query)

const isHomePageShown = () => {
  // Logic to determine if the home page is shown based on the current location
}

const handleSearchParams = () => {
  let params = new URLSearchParams(window.location.search)
  let query = new URLSearchParams(window.location.query)
  let filter = params.get('filter') || query.get('filter') || currentQuery.value?.filter || ''
  let sort = params.get('sort') || query.get('sort') || currentQuery.value?.sort || ''
  let search = params.get('search') || query.get('search') || currentQuery.value?.search || ''

  if (!filter || filter == 'undefined' || filter.toString().startsWith('function')) {
    appStore.setFilterItem('All categories')
  }

  if (!search || search == 'undefined' || search.toString().startsWith('function')) {
    appStore.setSearchTerm('')
  }

  if (!sort || sort == 'undefined' || sort.toString().startsWith('function')) {
    appStore.setSorting('default')
  }
}

const getHomeProducts = () => {
  handleSearchParams()
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
  productsLoading.value = appStore.loading.products
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
