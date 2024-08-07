<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useAppStore } from '../../stores/appStore'
import SearchFilterSort from './SearchFilterSort.vue'
import Footer from './MainFooter.vue'
import Header from './StickyHeader.vue'
import SuccessToast from './SuccessToast.vue'

const appStore = useAppStore()
const { fetchCategories, error } = appStore

const currentLocation = computed(() => appStore.currentLocation),
  showStaticPart = ref(true)
const isTopPartShown = () => {
  const isAuthPage = appStore.pages.authPages.includes(appStore.pageName)
  const cartPages = appStore.pages.cartPages.includes(appStore.pageName)

  showStaticPart.value = !(isAuthPage || cartPages)
}

const handleShowSearchFilterSort = (pathName) => {
  const isNotProductShow =
    pathName.startsWith('/wishlist') || pathName.startsWith('/auth') || pathName.startsWith('/cart')
  showStaticPart.value = !isNotProductShow
}

onMounted(() => {
  isTopPartShown()
  //   fetchProducts()
  fetchCategories()
})

watch(currentLocation, () => {
  appStore.pageName
  // isTopPartShown()
  handleShowSearchFilterSort(currentLocation.value.path)
})
</script>

<template>
  <div>
    <!-- Header -->
    <Header v-if="showStaticPart" />

    <main>
      <div class="page-content">
        <!-- Search Filter Sort -->
        <SearchFilterSort v-show="showStaticPart" />

        <!-- Error -->
        <div v-if="error" class="w-full flex justify-center">
          <p class="mt-28 text-red-500 text-xl font-bold">
            {{ error.message }}
          </p>
        </div>

        <!-- Content Slot -->
        <slot></slot>
      </div>
    </main>

    <!-- Toast Notification -->
    <SuccessToast />

    <!-- Footer -->
    <Footer v-if="showStaticPart" />
  </div>
</template>
