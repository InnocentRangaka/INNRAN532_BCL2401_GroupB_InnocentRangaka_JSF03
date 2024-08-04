<script setup>
import { watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import ProductCards from '../components/ProductCards.vue'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'
import { fetchProducts } from '../api/api'

const appStore = useAppStore()
const {
  // fetchProducts,
  getCategories,
  categories,
  setFilterItem,
  products,
  loading,
  error,
  setPageLoading
} = appStore

// Using vue-router hooks
const route = useRoute()
const router = useRouter()

// Reactive references for state
const category = ref(route.params.category)
let productsLoading = ref(loading.products),
  categoryProducts = ref(appStore.products)
let numberofSkeletons = ref(4)
// console.log(route)

const fetchProductsByCategory = async (name) => {
  const currentCategory = appStore.categories.find((categoryName) => categoryName.startsWith(name))

  setFilterItem(currentCategory)
  const { data, error, fetching } = await fetchProducts(appStore)
  while (fetching.value) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  categoryProducts = data.value

  return currentCategory
}

const getCategoryProducts = async (newCategory) => {
  appStore.products = []
  let currentCategory = await fetchProductsByCategory(newCategory)

  // console.log(newCategory, currentCategory, getCategories, appStore.categories)

  if (!currentCategory) {
    currentCategory = await fetchProductsByCategory(newCategory)
    // console.log(newCategory, currentCategory, appStore.loading.products)
  }

  setTimeout(() => {
    // numberofSkeletons = appStore.products.length
    if (appStore.loading.products) {
      appStore.setProductsLoading(false)
    }
  }, 1200)

  return currentCategory
}
// console.log(getCategory(category.value), category.value, getCategories)

onMounted(async () => {
  getCategoryProducts(category.value)
})

watch(
  () => route.params.category,
  async (newCategory) => {
    getCategoryProducts(newCategory)
  },
  () => productsLoading,
  () => categoryProducts,
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="grid justify-center">
    <!-- Show skeleton loading cards while products are loading -->
    <div
      v-show="appStore.loading.products"
      class="container lg:max-h-[130rem] mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4 px-2 md:px-0"
    >
      <ProductCardSkeleton v-for="i in numberofSkeletons" :key="i" />
    </div>
    <!-- Show product cards when products are loaded and no error -->
    <ProductCards />
  </div>
</template>
