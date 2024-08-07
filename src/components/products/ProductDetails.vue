<script setup>
import { watchEffect, ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import RatingStars from '../icons/RatingStars.vue'
import TopBackLink from '../includes/TopBackLink.vue'

/**
 * Application store for managing global state, including product details, cart, and wishlist.
 * @type {ReturnType<typeof useAppStore>}
 */
const appStore = useAppStore()

/**
 * Methods and reactive variables from the application store.
 * @typedef {Object} AppStoreMethods
 * @property {Function} isInWishList - Checks if a product is in the wishlist.
 * @property {Function} addToFavourites - Adds a product to the wishlist.
 * @property {Function} addToCart - Adds a product to the cart.
 * @property {Function} viewProduct - Fetches the details of the product to view.
 * @property {Object} cart - Contains cart-related data.
 * @property {string} currency - Current currency symbol.
 * @property {Object} loading - Contains loading states for various components.
 */

/**
 * Destructured methods and variables from the app store.
 * @type {AppStoreMethods}
 */
const { isInWishList, addToFavourites, addToCart, cart, currency } = appStore

/**
 * Reactive reference to store the current product details.
 * @type {Ref<Object>}
 */
let product = ref(appStore.viewProduct)

/**
 * Reactive reference to store the current currency.
 * @type {Ref<string>}
 */
let currentCurrency = ref(appStore.currency)

// Fetch product details and update the reference on component mount
onMounted(async () => {
  setTimeout(() => {
    product.value = appStore.viewProduct
  }, 1000)
})

// Watch for changes in the product and currency, and update the references
watchEffect(() => {
  product.value = appStore.viewProduct
  currentCurrency.value = appStore.currentCurrency
  appStore.viewProduct
})
</script>

<template>
  <div v-show="!appStore.loading.products">
    <TopBackLink />
    <div v-show="appStore.viewProduct.id">
      <div class="container mx-auto bg-white p-8 rounded-lg shadow-md mb-4">
        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-7xl xl:max-w-8xl mx-auto">
          <div class="mx-auto w-2/5 flex-none -mt-2">
            <img :src="product.image" alt="" class="w-[90%] h-[90%]" />
          </div>
          <div class="mx-auto w-[90%] space-y-2 -mt-2 text-gray-500">
            <h1 class="text-2xl md:text-4xl lg:text-4xl font-bold">
              {{ product.title }}
            </h1>
            <div v-if="product.rating">
              <div class="flex gap-2 place-items-baseline items-center">
                <RatingStars :rating-number="product.rating.rate" />
                <div>{{ product.rating.rate }}</div>
                <span>|</span>
                <div>Reviews: {{ product.rating.count }}</div>
              </div>
            </div>
            <span
              class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              {{ product.category }}
            </span>
            <h3 class="text-xl md:text-2xl lg:text-2xl font-extrabold text-slate-600">
              {{ currency }} {{ product.price }}
            </h3>
            <div class="flex w-full justify-start space-x-2 mt-2 place-items-center items-center">
              <button
                class="bg-transparent flex-0"
                :class="
                  isInWishList(product.id)
                    ? 'cursor-pointer text-red-500'
                    : 'cursor-pointer text-gray-700'
                "
                @click="addToFavourites(product.id)"
              >
                <svg
                  class="me-1.5 h-5 w-5 hover:fill-red-500 hover:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  transform="scale(1.6)"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
              </button>
              <button
                :id="`add-to-cart-${product.id}`"
                @click="addToCart(product, $event.target)"
                class="inline-flex justify-center bg-cyan-700 hover:bg-blue-900 focus:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem] font-bold text-white py-2 px-4 rounded"
              >
                {{ cart.addToCartText }}
              </button>
            </div>
            <h2 class="text-lg font-bold">Description</h2>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
