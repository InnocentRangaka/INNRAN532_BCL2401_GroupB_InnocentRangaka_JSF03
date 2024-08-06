<script setup>
import { defineProps } from 'vue'

// Define the `ratingNumber` prop
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="container min-h-full text-center mx-auto pt-20">
    <div class="w-full min-h-full text-center">
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        No item found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find any item in your {{ name }}.
      </p>
      <div class="mt-10 flex items-center justify-center gap-4">
        <router-link
          to="/"
          class="cursor-pointer rounded-md text-gray-900 hover:text-cyan-900 hover:underline py-2.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          <span class="mb-[0.12rem] font-semibold">Continue shopping</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
