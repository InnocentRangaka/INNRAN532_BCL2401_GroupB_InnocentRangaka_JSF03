<script setup>
import { onMounted, nextTick } from 'vue'
import router from './router'
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore'
import Layout from './components/includes/MainLayout.vue'

const appStore = useAppStore()
// const app = store;
// const loading = appStore.loading

// Call the appropriate action directly on the store
appStore.fetchCategories()

router.afterEach((to, from) => {
  appStore.currentLocation = {
    path: to.path,
    params: to.params,
    query: to.query,
    route: to.route,
    userData: to.userData,
    componentName: to.componentName,
    previous: {
      path: from.path,
      params: from.params,
      query: from.query,
      route: from.route,
      userData: from.userData,
      componentName: from.componentName
    }
  }
})

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
