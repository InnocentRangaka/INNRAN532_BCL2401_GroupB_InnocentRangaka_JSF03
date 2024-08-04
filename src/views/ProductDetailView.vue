<script setup>
import { watchEffect, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import ProductDetails from '../components/ProductDetails.vue'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton.vue'

const appStore = useAppStore()
const {
  fetchSingleProduct,
  setFilterItem,
  getCategories,
  categories,
  viewProduct,
  loading,
  error,
  setPageLoading
} = appStore

// Using vue-router hooks
const route = useRoute()
const router = useRouter()

// console.log(route)

let currentProduct = ref(viewProduct)
let productsLoading = ref(loading.products)

const isHomePageShown = () => {
  // Logic to determine if the home page is shown based on the current location
}

const getSingelProduct = () => {
  const path = route.path,
    query = route.query,
    params = route?.params

  if (params && Object.values(params).length > 0) {
    const id = params?.id

    if (id) {
      fetchSingleProduct(id)
    }
  }
}

onMounted(async () => {
  getSingelProduct()
  setTimeout(() => {
    // appStore.setPageLoading(false)
    // appStore.setProductsLoading(false)
  }, 1000)
})

// console.log(getCategories)

watchEffect(() => {
  ;() => currentProduct, () => productsLoading
})
</script>

<template>
  <!-- Show skeleton loading cards while products are loading -->
  <div v-show="appStore.loading.products" class="flex flex-col w-full justify-center">
    <ProductDetailSkeleton />
  </div>
  <div class="grid justify-center">
    <!-- Show product cards when products are loaded and no error -->
    <!-- <ProductCards v-if="!appStore.loading.products" /> -->
    <ProductDetails />
  </div>
</template>
