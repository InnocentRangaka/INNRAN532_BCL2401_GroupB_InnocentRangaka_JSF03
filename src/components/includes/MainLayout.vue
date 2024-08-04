<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '../../stores/appStore'
import SearchFilterSort from './SearchFilterSort.vue'
import Footer from './Footer.vue'
import Header from './TopHeader.vue'
import Toast from './Toast.vue'

const appStore = useAppStore()
const { fetchCategories, error } = appStore

const showTopPart = ref(true)

const isTopPartShown = () => {
  const isAuthPage = appStore.pages.authPages.includes(appStore.pageName)
  const cartPages = appStore.pages.cartPages.includes(appStore.pageName)

  showTopPart.value = !(isAuthPage || cartPages)
}

onMounted(() => {
  isTopPartShown()
  //   fetchProducts()
  fetchCategories()
})

watch(
  () => appStore.pageName,
  () => {
    isTopPartShown()
  }
)
</script>

<template>
  <div>
    <!-- Header -->
    <Header v-if="showTopPart" />

    <main>
      <div class="page-content">
        <!-- Search Filter Sort -->
        <SearchFilterSort v-show="showTopPart" />

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
    <Toast />

    <!-- Footer -->
    <Footer />
  </div>
</template>
