<script setup>
import { watchEffect, ref, onMounted, nextTick } from 'vue'
import { useAppStore } from '../../stores/appStore'
import RatingStars from '../icons/RatingStars.vue'
import TopBackLink from '../includes/TopBackLink.vue'
import { useRoute, useRouter } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const { isInWishList, addToCart, viewProduct, cart, currency, loading } = appStore

let product = ref(appStore.viewProduct)
let currentCurrency = ref(appStore.currency)
let productsLoading = ref(loading.products)

product = appStore.viewProduct

onMounted(async () => {
  setTimeout(() => {
    product = appStore.viewProduct
    // console.log(product, appStore.viewProduct)
    // appStore.setProductsLoading(false)
  }, 1000)
})

watchEffect(() => {
  product = appStore.viewProduct
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
          <div class="mx-auto w-[90%] space-y-2 -mt-2 text-gray-600">
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
            <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">
              {{ currency }} {{ product.price }}
            </h3>
            <button
              :id="`add-to-cart-${product.id}`"
              @click="addToCart(product, $event.target)"
              class="inline-flex justify-center bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem] font-bold text-white py-2 px-4 rounded"
            >
              {{ cart.addToCartText }}
            </button>
            <h2 class="text-lg font-bold">Description</h2>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
