<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { useRouter } from 'vue-router'

import CartIcon from '../icons/CartIcon.vue'
import HeartIcon from '../icons/HeartIcon.vue'
import HamburgerIcon from '../icons/HamburgerIcon.vue'
import UserIcon from '../icons/UserIcon.vue'

/**
 * Vue Router instance used for navigation.
 * @type {ReturnType<typeof useRouter>}
 */
const router = useRouter()

/**
 * Application store for managing global state.
 * @type {ReturnType<typeof useAppStore>}
 */
const appStore = useAppStore()

/**
 * Function to fetch categories from the app store.
 * @type {Function}
 */
const { fetchCategories } = appStore

/**
 * Reactive reference for storing categories.
 * @type {Ref<Array<string>>}
 */
const categories = ref([])

/**
 * Reactive reference to toggle mobile menu visibility.
 * @type {Ref<boolean>}
 */
const mobileMenuOpen = ref(false)

/**
 * Computed property for getting the total number of items in the cart.
 * @type {ComputedRef<number>}
 */
const cartTotalItems = computed(() => appStore.cart.totalItems)

/**
 * Computed property for getting the wish list items.
 * @type {ComputedRef<Array<Object>>}
 */
const wishListItems = computed(() => appStore.wishList)

/**
 * Computed property for getting the current route name.
 * @type {ComputedRef<string>}
 */
let pageName = computed(() => router.currentRoute.value.name)

/**
 * Function to check if a given page is the active page.
 * @param {string} name - The name of the page to check.
 * @returns {boolean} - Returns `true` if the page is active, `false` otherwise.
 */
const isActivePage = (name) => {
  const routeName = pageName?.value
  let page = routeName?.toLowerCase()
  if (routeName == 'Products') {
    page = router.currentRoute?.value?.params?.category
  }

  return page == name
}

/**
 * Toggles the mobile menu visibility.
 * @function
 */
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

/**
 * Function to clean and format the category name for the menu.
 * @param {string} category - The category name to format.
 * @returns {string} - The formatted category name.
 */
const menuName = (category) => {
  const cleanCategory = category ? category.toLowerCase() : category
  return `${cleanCategory.replace("'s clothing", '')}`
}

/**
 * Capitalizes the first letter of the given name.
 * @param {string} name - The name to capitalize.
 * @returns {string} - The capitalized name.
 */
const capitalizeMenuName = (name) => name.charAt(0).toUpperCase() + name.slice(1)

/**
 * Navigates to the specified path using Vue Router.
 * @param {string} path - The path to navigate to.
 */
const navigateTo = (path) => {
  router.push(path)
}

/**
 * Lifecycle hook to fetch categories on component mount and update the store.
 * @function
 */
onMounted(async () => {
  await fetchCategories(appStore)
  categories.value = appStore?.categories
  // wishListItems.value = appStore?.wishList && Object.values(appStore?.wishList)?.length
  // cartTotalItems.value = appStore?.cart?.totalItems
})
</script>

<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-white border-gray-200">
      <div class="container flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <!-- SwiftCart Logo -->
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span
            class="hidden sm:flex self-center items-center text-2xl font-semibold whitespace-nowrap text-gray-700 md:hover:text-blue-700"
          >
            SwiftCart
          </span>
        </router-link>

        <div class="hidden sm:flex justify-center items-center gap-4">
          <router-link
            v-if="categories.length > 0"
            to="/"
            :class="{
              'text-cyan-700': isActivePage('home'),
              'text-gray-700': !isActivePage('home')
            }"
            class="font-medium md:hover:text-blue-700"
          >
            All
          </router-link>
          <router-link
            v-for="category in categories"
            :key="category"
            :to="`/products/category/${menuName(category)}`"
            :class="{
              'text-cyan-700': isActivePage(menuName(category)),
              'text-gray-700': !isActivePage(menuName(category))
            }"
            class="font-medium md:hover:text-blue-700"
          >
            {{ capitalizeMenuName(menuName(category)) }}
          </router-link>
        </div>

        <div>
          <!-- Desktop Menu -->
          <div class="flex flex-wrap items-center justify-end">
            <div class="block md:w-auto" id="navbar-dropdown">
              <ul
                class="flex flex-row h-[32px] font-medium md:p-0 border border-gray-100 rounded-lg bg-white gap-2 md-gap-4 rtl:space-x-reverse items-center md:mt-0 md:border-0"
              >
                <li>
                  <button
                    @click="navigateTo('/wishlist')"
                    :class="{
                      'text-cyan-700': isActivePage('wishlist'),
                      'text-gray-700': !isActivePage('wishlist')
                    }"
                    class="group inline-flex p-2 w-[32px] h-[32px] rounded-full hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 justify-center items-center focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <div class="block md:block relative">
                      <div v-if="wishListItems.totalItems" class="mt-0 absolute left-3 -top-3">
                        <p
                          class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                        >
                          {{ wishListItems.totalItems }}
                        </p>
                      </div>
                      <HeartIcon class="hover:bg-transparent" />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    @click="navigateTo('/cart')"
                    :class="{
                      'text-cyan-700': isActivePage('cart'),
                      'text-gray-700': !isActivePage('cart')
                    }"
                    class="group inline-flex p-2 w-[32px] h-[32px] rounded-full hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 justify-center items-center focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <div class="block md:block relative">
                      <div v-if="cartTotalItems" class="mt-0 absolute left-3 -top-3">
                        <p
                          class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                        >
                          {{ cartTotalItems }}
                        </p>
                      </div>
                      <CartIcon />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    @click="navigateTo('/auth/login')"
                    :class="{
                      'text-cyan-700': isActivePage('login'),
                      'text-gray-700': !isActivePage('login')
                    }"
                    class="group inline-flex w-[32px] h-[32px] rounded-full hover:bg-transparent md:hover:text-blue-700 justify-center items-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <UserIcon />
                  </button>
                </li>
                <li class="md:hidden">
                  <button
                    @click="toggleMobileMenu"
                    class="group inline-flex self-end p-2 w-[32px] h-[32px] justify-center items-center text-sm text-gray-700 md:hover:text-blue-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    :aria-expanded="mobileMenuOpen"
                  >
                    <span class="sr-only">Open main menu</span>
                    <HamburgerIcon />
                  </button>
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
          class="flex flex-col top-10 font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:hidden"
        >
          <li v-for="category in categories" :key="category">
            <router-link
              :to="`/products/category/${menuName(category)}`"
              :class="{
                'text-cyan-700': isActivePage(menuName(category)),
                'text-gray-700': !isActivePage(menuName(category))
              }"
              class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              {{ capitalizeMenuName(category) }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
