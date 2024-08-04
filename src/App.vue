<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore'
import Layout from './components/includes/Layout.vue'

const appStore = useAppStore()
// const app = store;
const loading = appStore.loading

// Call the appropriate action directly on the store
appStore.fetchCategories()

onMounted(async () => {
  setTimeout(() => {
    appStore.setPageLoading(false)
  }, 2000)
})

nextTick(() => {})
</script>

<template>
  <Layout> <RouterView /> </Layout>
</template>
