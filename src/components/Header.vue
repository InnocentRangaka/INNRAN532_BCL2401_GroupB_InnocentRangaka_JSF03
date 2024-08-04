<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useRouter } from 'vue-router'
import CartIcon from './icons/CartIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'

const router = useRouter()
const appStore = useAppStore()

const { app, fetchCategories } = appStore

const categories = ref([])
const wishListItems = ref(0)
const cartTotalItems = ref(0)
const mobileMenuOpen = ref(false)

const pageName = computed(() => router.currentRoute.value.name)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const menuName = (category) => {
  const cleanCategory = category ? category.toLowerCase() : category
  return `${cleanCategory.replace("'s clothing", '')}`
}

const capitalizeMenuName = (name) => name.charAt(0).toUpperCase() + name.slice(1)

onMounted(async () => {
  await fetchCategories(appStore)
  categories.value = appStore?.categories
  wishListItems.value = appStore?.wishList && Object.values(appStore?.wishList)?.length
  cartTotalItems.value = appStore?.cart?.totalItems
})
</script>

<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-white border-gray-200">
      <div class="container flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- SwiftCart Logo -->
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap text-gray-700 md:hover:text-blue-700"
          >
            SwiftCart
          </span>
        </router-link>

        <div class="hidden lg:flex items-center space-x-8">
          <router-link
            v-if="categories.length > 0"
            to="/"
            :class="{ 'text-cyan-700': pageName === 'home', 'text-gray-700': pageName !== 'home' }"
            class="font-medium md:hover:text-blue-700"
          >
            All
          </router-link>
          <router-link
            v-for="category in categories"
            :key="category"
            :to="`/products/category/${menuName(category)}`"
            :class="{
              'text-cyan-700': pageName === menuName(category),
              'text-gray-700': pageName !== menuName(category)
            }"
            class="font-medium md:hover:text-blue-700"
          >
            {{ capitalizeMenuName(menuName(category)) }}
          </router-link>
        </div>

        <div>
          <!-- Hamburger Button -->
          <button
            @click="toggleMobileMenu"
            class="inline-flex self-end items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 md:hover:text-blue-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            :aria-expanded="mobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <div v-if="cartTotalItems" class="t-0 absolute left-3 -top-4">
              <p
                class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
              ></p>
            </div>
            <HamburgerIcon />
          </button>

          <!-- Desktop Menu -->
          <div class="flex flex-wrap items-center justify-end">
            <div class="hidden md:block md:w-auto" id="navbar-dropdown">
              <ul
                class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
              >
                <li>
                  <router-link
                    to="/wishlist"
                    :class="{
                      'text-cyan-700': pageName === 'wishlist',
                      'text-gray-700': pageName !== 'wishlist'
                    }"
                    class="group hover:bg-gray-100 md:hover:bg-transparent"
                  >
                    <div class="hidden lg:block md:block relative">
                      <div v-if="wishListItems" class="t-0 absolute left-3 -top-4">
                        <p
                          class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                        >
                          {{ wishListItems }}
                        </p>
                      </div>
                      <HeartIcon pageName />
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/cart"
                    :class="{
                      'text-cyan-700': pageName === 'cart',
                      'text-gray-700': pageName !== 'cart'
                    }"
                    class="group hover:bg-gray-100 md:hover:bg-transparent"
                  >
                    <div class="hidden lg:block md:block relative">
                      <div v-if="cartTotalItems" class="t-0 absolute left-3 -top-4">
                        <p
                          class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                        >
                          {{ cartTotalItems }}
                        </p>
                      </div>
                      <CartIcon />
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/auth/login"
                    :class="{
                      'text-cyan-700': pageName === 'login',
                      'text-gray-700': pageName !== 'login'
                    }"
                    class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    Login
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="w-full md:block md:w-auto">
        <ul
          v-if="mobileMenuOpen"
          class="flex flex-col top-10 font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li v-for="category in categories" :key="category">
            <router-link
              :to="`/products/category/${menuName(category)}`"
              :class="{
                'text-cyan-700': pageName === menuName(category),
                'text-gray-700': pageName !== menuName(category)
              }"
              class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              {{ capitalizeMenuName(category) }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/wishlist"
              class="block py-2 px-3 relative text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Wishlist
              <div v-if="wishListItems" class="t-0 absolute left-[75px] top-2">
                <p
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-gray-700"
                >
                  {{ wishListItems }}
                </p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              to="/cart"
              class="relative lg:hidden md:hidden py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Cart
              <div v-if="cartTotalItems" class="t-0 absolute -right-5 top-2">
                <p
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-gray-700"
                >
                  {{ cartTotalItems }}
                </p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              to="/auth/login"
              :class="{
                'text-cyan-700': pageName === 'login',
                'text-gray-700': pageName !== 'login'
              }"
              class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
