<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import HeartIcon from '../icons/HeartIcon.vue'
import { useAppStore } from '../../stores/appStore'

const appStore = useAppStore()

const wishListItems = computed(() => appStore.wishList)
</script>

<template>
  <div class="hidden lg:block md:block relative">
    <div v-if="wishListItems.totalItems" class="t-0 absolute left-3 -top-4">
      <p
        class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
      >
        {{ wishListItems.totalItems }}
      </p>
    </div>
    <HeartIcon />
  </div>
</template>
