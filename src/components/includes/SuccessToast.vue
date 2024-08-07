<script setup>
import { onMounted, onUnmounted, computed, watch } from 'vue'
import { useAppStore } from '../../stores/appStore' // Make sure to correctly import your store

/**
 * Application store for managing global state, including toast notifications.
 * @type {ReturnType<typeof useAppStore>}
 */
const appStore = useAppStore()

/**
 * Function to close the toast notification.
 * @type {Function}
 */
const { closeToast } = appStore
/**
 * Computed property to determine if the toast notification is visible.
 * @type {ComputedRef<boolean>}
 */
const visible = computed(() => appStore.toast.visible)

/**
 * Computed property for getting the message of the toast notification.
 * @type {ComputedRef<string>}
 */
const message = computed(() => appStore.toast.message)

/**
 * Computed property for getting the progress percentage of the toast notification.
 * @type {ComputedRef<number>}
 */
const percent = computed(() => appStore.toast.percent)

/**
 * Lifecycle hook called when the component is mounted.
 * Shows the toast notification if it is visible.
 * @function
 */
onMounted(() => {
  if (visible.value) {
    // showToast(message) // Uncomment this line if you want to show the toast on mount
  }
})

/**
 * Lifecycle hook called when the component is unmounted.
 * Closes the toast notification when the component is destroyed.
 * @function
 */
onUnmounted(() => {
  closeToast()
})

/**
 * Watcher to monitor changes in the visibility of the toast notification.
 * Updates toast properties based on visibility.
 * @function
 */
watch(visible, () => {
  // visible.value = toast.value.visible
  // message.value = toast.value.message
  // percent.value = toast.value.percent
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed w-[300px] overflow-hidden bottom-0 right-0 m-4 dark:bg-green-950/80 border-green-700 border-1 text-white rounded-lg shadow-md"
    >
      <div class="flex items-center justify-between px-4 py-3">
        <span>{{ message }}</span>
        <button @click.stop="closeToast" class="text-xs font-bold">X</button>
      </div>
      <div class="w-full bg-green-700 rounded-full h-1 mb-[0.4px]">
        <div class="w-0 bg-green-500 h-1 rounded-full" :style="{ width: percent + '%' }"></div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
