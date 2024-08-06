<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '../stores/appStore'
import { calculateSubTotalAmount, calculateCartTotal, calculateTaxAmount } from '../utils/utils'

import NoItemFound from '../components/includes/NoItemFound.vue'

const appStore = useAppStore()
const { cart, isInCartItems, updateCart } = appStore

const initiateCart = () => {
  const { cartItems, totalItems, subTotalAmount, taxAmount, totalAmount } = cart
  cart.addToCartText = cart.addToCartText
  cart.shippingRate = cart.shippingRate
  cart.shippingMethod = cart.shippingMethod
  cart.cartItems = cartItems
  cart.totalItems = totalItems
  cart.subTotalAmount = subTotalAmount
  cart.taxAmount = taxAmount
  cart.totalAmount = totalAmount
}

const updateQuantity = (event, item) => {
  const quantity = event.target.value
  const findItemInCart = isInCartItems(item.id, appStore.cart.cartItems)

  if (findItemInCart) {
    const index = cart.cartItems.indexOf(findItemInCart)
    cart.cartItems[index].quantityUpdating = true

    setTimeout(() => {
      const newCartItems = [...cart.cartItems]

      if (newCartItems[index]) {
        newCartItems[index].quantity = quantity
        newCartItems[index].totalPrice = (quantity * newCartItems[index].price).toFixed(2)
      }

      // updateCart(newCartItems)
      console.log(newCartItems)

      cart.cartItems[index].quantityUpdating = false
    }, 2000)
  }
}

const removeItem = (item) => {
  // Implement remove item logic here
}

onMounted(() => {
  initiateCart()
})

watch(
  () => appStore.cart,
  () => {
    initiateCart()
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div class="bg-gray-100 mb-10">
      <div
        class="container grid grid-cols-1 sm:grid-cols-2 items-center mx-auto px-4 py-4 min-h-[44px]"
      >
        <h1 class="text-gray-800 text-xl font-bold my-2">Shopping Cart ({{ cart.totalItems }})</h1>
        <div class="mb-2 text-xs text-right flex items-end ml-auto">
          <a href="/#/" class="cursor-pointer text-gray-900 hover:text-cyan-900 hover:underline">
            <span class="flex h-full items-center text-xs text-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="currentColor"
              >
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
              </svg>
              <span class="mb-[0.1rem]">Continue shopping</span>
            </span>
          </a>
        </div>
      </div>
    </div>

    <div v-if="cart.totalItems > 0" class="container mx-auto mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-x-10 sm:gap-y-6 relative">
        <div class="col-span-2 relative bg-white p-8 rounded-lg shadow-md">
          <div v-for="cartItem in cart.cartItems" :key="cartItem.id" class="border-b pb-4 mb-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center w-full relative gap-4 sm:gap-10">
                <img
                  :src="cartItem.image"
                  :alt="cartItem.title"
                  class="w-20 h-20 object-cover mt-[0.35rem] self-start"
                />
                <div class="flex flex-col">
                  <div class="grid w-full grid-cols-1 relative">
                    <h2 class="text-gray-700 text-lg font-semibold">{{ cartItem.title }}</h2>
                    <p
                      class="text-slate-500 text-ellipsis overflow-hidden break-words max-w-full max-h-12 line-clamp-2"
                    >
                      {{ cartItem.description }}
                    </p>
                    <div
                      class="text-slate-600 flex flex-col sm:flex-row items-center sm:justify-between mt-3"
                    >
                      <div class="w-full h-full flex items-center">
                        <p class="text-lg font-bold">$ {{ cartItem.totalPrice }}</p>
                        <p
                          v-if="cartItem.id !== 1 && cartItem.id !== 5"
                          class="text-green-500 flex items-center ml-5 text-xs"
                        >
                          <svg
                            class="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          In stock
                        </p>
                        <p v-else class="text-yellow-500 flex items-center ml-5 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            class="w-4 h-4 mr-1"
                            fill="currentColor"
                            stroke="currentColor"
                          >
                            <path
                              d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                            />
                          </svg>
                          Ships in 3-4 weeks
                        </p>
                      </div>
                      <div class="w-full flex mx-auto items-center justify-between pt-4 sm:pt-0">
                        <div class="flex min-h-full items-center">
                          <div class="border rounded-lg pl-2 pr-1 py-1 relative">
                            <input
                              class="w-[20px] absolute left-3 z-0 bg-white"
                              type="text"
                              :value="cartItem.quantity"
                              readonly
                            />
                            <select
                              class="w-[40px] z-1"
                              @change="updateQuantity($event, cartItem)"
                              :value="cartItem.quantity"
                              :disabled="cartItem.quantityUpdating"
                            >
                              <option
                                v-for="i in 10"
                                :key="i"
                                :value="i"
                                :selected="i === cartItem.quantity"
                              >
                                {{ i }}
                              </option>
                            </select>
                          </div>
                          <div v-if="cartItem.quantityUpdating" class="ml-2">Updating...</div>
                        </div>
                        <div class="inline-flex items-end place-content-center text-xs">
                          <div v-if="cartItem.removeItem">Removing item...</div>
                          <button
                            v-else
                            @click="removeItem(cartItem)"
                            class="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-slate-600 bg-white p-8 rounded-lg shadow-md relative sm:sitcky">
          <h2 class="text-gray-700 text-lg font-semibold mb-4">Order summary</h2>
          <div class="flex justify-between mb-2">
            <span>Subtotal</span>
            <span class="text-gray-700">$ {{ cart.subTotalAmount }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Shipping estimate</span>
            <span class="text-gray-700">$ 0.00</span>
          </div>
          <div class="flex justify-between font-semibold text-lg mb-8">
            <span>Order total</span>
            <span class="text-gray-700">$ {{ cart.totalAmount }}</span>
          </div>
          <a
            href="/checkout"
            class="flex justify-center bg-cyan-700 hover:bg-cyan-900 w-full font-bold text-white py-2 px-4 rounded"
          >
            <span>Checkout</span>
          </a>
        </div>
      </div>
    </div>

    <NoItemFound v-else name="cart" />
  </div>
</template>
