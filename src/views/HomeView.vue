<script setup>
import { watchEffect, reactive, toRefs, onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import ProductCards from '../components/ProductCards.vue'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'

const appStore = useAppStore()
const { getCategories, categories, products, loading, error } = appStore

// const categories = ref(appStore.categories)
// const products = ref(appStore.products)

// const getCategories = () => {
//   categories.value = appStore.categories
// }

// const getProducts = () => {
//   products.value = appStore.products
// }

const app = reactive({
  ...toRefs(appStore.state),
  ...toRefs(appStore.getters),
  ...appStore.actions
})

let getLocation = window.location.href
  .replace(window.location.origin, '')
  .replace(window.location.pathname, '')
let categoryParams = app.currentLocation?.params?.category
let categoryPath = app.currentLocation?.path.replace('/products/category/', '')

const fetchAllProducts = async (thisType = 'products', thisApp = app) => {
  await thisApp.initializeProducts(thisType)

  if (thisApp.products.length < 20) {
    if (getLocation.startsWith('#/') && getLocation.endsWith('#/')) {
      thisApp.setFilterItem('All categories')
      await initializeCategories(thisApp)
      await thisApp.fetchProducts()
    }
  }
}

const isHomePageShown = () => {
  // Logic to determine if the home page is shown based on the current location
}

onMounted(async () => {
  // await fetchAllProducts('products', app)
  setTimeout(() => {
    app.setLoadingPage(false)
  }, 1000)
})

console.log(appStore.getCategories)

watchEffect(() => {
  ;() => categories, () => products
})
</script>

<template>
  <h1>Home</h1>
  <div>
    <button @click="getCategories">Fetch Categories</button>
    <button @click="getProducts">Fetch Products</button>
    <button @click="fetchFavourites({ 1: '1', 2: '2' })">Fetch Favourites</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <div>
      <h1 class="text-grey-900">Categories</h1>
      <ul>
        <li v-for="category in appStore.getCategories" :key="category">{{ category }}</li>
      </ul>
    </div>
    <div>
      <h1 class="text-grey-900">Products</h1>
      <ul>
        <li v-for="product in appStore.products" :key="product.id">{{ product.title }}</li>
      </ul>
    </div>
  </div>

  <div class="grid justify-center">
    <!-- Show skeleton loading cards while products are loading -->
    <div
      v-if="app.loading.products"
      class="container mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4"
    >
      <ProductCardSkeleton v-for="i in 20" :key="i" />
    </div>
    <!-- Show product cards when products are loaded and no error -->
    <ProductCards v-if="!app.loading.products && !app.error" />
  </div>
</template>
