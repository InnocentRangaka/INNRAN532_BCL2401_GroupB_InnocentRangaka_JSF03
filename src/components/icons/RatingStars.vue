<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

// Define the `ratingNumber` prop
const props = defineProps({
  ratingNumber: {
    type: Number,
    required: true
  }
})

/**
 * Creates a string by repeating a given element a specified number of times.
 * @param {number} number - The number of times to repeat the element.
 * @param {string} element - The element to repeat.
 * @returns {string} - A string containing the repeated elements.
 */
const createArrayAndElements = (number, element) => {
  return Array(number).fill(element).join('')
}

/**
 * Generates the HTML string for rating stars based on the rating number.
 * @param {number} number - The rating number.
 * @returns {string} - The HTML string with the rating stars.
 */
const generateRatingStars = (number) => {
  const ratedStarsNumber = Math.round(number),
    remainingStars = Math.max(0, 5 - ratedStarsNumber),
    nonRatedStarsNumber = remainingStars <= 4 ? remainingStars : 0

  const goldenStar = `
        <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
      `,
    grayStar = `
        <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
      `

  const goldenStars = createArrayAndElements(ratedStarsNumber, goldenStar)
  const grayStars = createArrayAndElements(nonRatedStarsNumber, grayStar)

  return goldenStars + grayStars
}

// Computed property to generate the rating stars HTML string
const ratingStars = computed(() => generateRatingStars(props.ratingNumber))
</script>

<template>
  <div class="flex flex-row" v-html="ratingStars"></div>
</template>
