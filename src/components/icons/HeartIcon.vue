<script setup>
import { defineProps } from 'vue'

// Define the `pageName` prop
const props = defineProps({
  pageName: {
    type: String,
    required: false
  }
})

const pageName = props.pageName
</script>

<template>
  <svg
    class="h-6 w-6 group-hover:bg-gray-100 md:group-hover:stroke-blue-700 cursor-pointer"
    :class="{
      'stroke-cyan-700': pageName === 'wishlist',
      'stroke-gray-700': pageName !== 'wishlist'
    }"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
    />
  </svg>
</template>
