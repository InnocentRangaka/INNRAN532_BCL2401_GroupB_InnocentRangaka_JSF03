<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '../../stores/appStore'

/**
 * The application store instance used for accessing global state.
 * @type {ReturnType<typeof useAppStore>}
 */
const appStore = useAppStore()

/**
 * Computed property for accessing categories from the app store.
 * @type {ComputedRef<string[]>}
 */
const categories = computed(() => appStore.categories)

/**
 * Reactive reference for the current page name from the app store.
 * @type {Ref<string>}
 */
const pageName = ref(appStore.pageName)

/**
 * Lifecycle hook that runs when the component is mounted.
 */
onMounted(() => {})

/**
 * Determines whether the footer should be shown based on the current page name.
 * @param {string} pageName - The name of the current page.
 * @returns {boolean} - Whether the footer should be displayed.
 */
const isShowing = (pageName) => {
  const authPages = appStore.pages.authPages
  const cartPages = appStore.pages.cartPages
  const isIndexed = authPages.includes(pageName) || cartPages.includes(pageName)
  return !isIndexed
}

/**
 * Gets the current year.
 * @returns {number} - The current year.
 */
const getThisYear = () => {
  return new Date().getFullYear()
}

/**
 * Capitalizes the menu name by replacing hyphens with spaces and capitalizing the first letter of each word.
 * @param {string} menuName - The menu name to be capitalized.
 * @returns {string} - The capitalized menu name.
 */
const capitalizeMenuName = (menuName) => {
  return menuName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * Formats the category name for the menu by removing specific substrings and converting to lowercase.
 * @param {string} category - The category name to be formatted.
 * @returns {string} - The formatted menu name.
 */
const menuName = (category) => {
  const cleanCategory = category ? category.toLowerCase() : category
  return `${cleanCategory.replace("'s clothing", '')}`
}
</script>

<template>
  <!-- Footer section -->
  <footer v-if="isShowing(pageName)" class="bg-white py-8 bottom-0 left-0 right-0 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Footer columns layout -->
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:grid sm:grid-cols-2 lg:grid-cols-6 gap-4 justify-between"
      >
        <!-- Categories section -->
        <div class="flex flex-col space-y-2">
          <h3 class="text-sm font-bold text-gray-900">Categories</h3>
          <a href="/" class="text-sm text-gray-700 md:hover:text-blue-700">All</a>
          <a
            v-for="category in categories"
            :key="category"
            :href="'/products/category/' + menuName(category)"
            class="text-sm text-gray-700 md:hover:text-blue-700"
          >
            {{ capitalizeMenuName(category) }}
          </a>
        </div>
        <!-- Support section -->
        <div class="flex flex-col space-y-2 mt-6 md:mt-0">
          <h3 class="text-sm font-bold text-gray-900">Support</h3>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Pricing</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Documentation</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Guides</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">API Status</a>
        </div>
        <!-- Company section -->
        <div class="flex flex-col space-y-2 mt-6 md:mt-0">
          <h3 class="text-sm font-bold text-gray-900">Company</h3>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">About</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Blog</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Jobs</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Press</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Partners</a>
        </div>
        <!-- Legal section -->
        <div class="flex flex-col space-y-2 mt-6 md:mt-0">
          <h3 class="text-sm font-bold text-gray-900">Legal</h3>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Claim</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Privacy</a>
          <a href="#/" class="text-sm text-gray-700 md:hover:text-blue-700">Terms</a>
        </div>
        <!-- Newsletter subscription section -->
        <div class="flex flex-col space-y-2 mt-6 md:mt-0 md:col-span-2">
          <h3 class="text-sm font-bold text-gray-900">Subscribe to our newsletter</h3>
          <p class="text-sm text-gray-700">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div class="flex flex-col md:flex-row relative sm:mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              class="p-2 border border-gray-300 rounded-l-md sm:w-full"
            />
            <button class="p-2.5 bg-cyan-700 text-white rounded-r-md hover:bg-cyan-900 sm:w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Footer bottom section -->
      <div class="mt-8 border-t pt-8 flex justify-between items-center">
        <p class="text-sm text-gray-700">
          &copy; {{ getThisYear() }} SwiftCart, Inc. All rights reserved.
        </p>
        <!-- Social media links -->
        <div class="flex space-x-4">
          <div class="flex space-x-4">
            <a href="#/" class="text-gray-400 hover:text-gray-700">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.404.595 24 1.325 24H12.82v-9.294H9.691v-3.622h3.129V8.411c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.462.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.762v2.313h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.324-.596 1.324-1.324V1.325C24 .595 23.404 0 22.675 0z"
                />
              </svg>
            </a>
            <a href="#/" class="text-gray-400 hover:text-gray-700">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.314 3.608 1.289.974.975 1.227 2.242 1.289 3.608.058 1.267.07 1.647.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.314 2.633-1.289 3.608-.975.975-2.242 1.227-3.608 1.289-1.267.058-1.647.07-4.85.07s-3.584-.012-4.851-.07c-1.366-.062-2.633-.314-3.608-1.289-.975-.975-1.227-2.242-1.289-3.608-.058-1.267-.07-1.647-.07-4.85s.012-3.584.07-4.851c.062-1.366.314-2.633 1.289-3.608.975-.975 2.242-1.227 3.608-1.289 1.267-.058 1.647-.07 4.851-.07zm0-2.163C8.756 0 8.332.012 7.052.07 5.773.127 4.52.371 3.41 1.48 2.301 2.59 2.057 3.843 2 5.123.942 6.403.931 6.824.931 12s.012 5.597.07 6.877c.057 1.279.301 2.532 1.41 3.641 1.109 1.109 2.362 1.353 3.641 1.41 1.279.057 1.7.07 6.876.07s5.597-.012 6.877-.07c1.279-.057 2.532-.301 3.641-1.41 1.109-1.109 1.353-2.362 1.41-3.641.057-1.279.07-1.7.07-6.877s-.012-5.597-.07-6.877c-.057-1.279-.301-2.532-1.41-3.641-1.109-1.109-2.362-1.353-3.641-1.41-1.279-.057-1.7-.07-6.877-.07zm0 5.838a6.162 6.162 0 0 0-6.162 6.162 6.162 6.162 0 0 0 6.162 6.162 6.162 6.162 0 0 0 6.162-6.162A6.162 6.162 0 0 0 12 5.838zm0 10.132a3.97 3.97 0 0 1-3.97-3.97 3.97 3.97 0 0 1 3.97-3.97 3.97 3.97 0 0 1 3.97 3.97 3.97 3.97 0 0 1-3.97 3.97zm7.26-10.763a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
                />
              </svg>
            </a>
            <a href="#/" class="text-gray-400 hover:text-gray-700">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.719-2.159-10.148-5.134-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.223 2.188 4.107-.807-.026-1.566-.248-2.23-.616v.062c0 2.386 1.693 4.374 3.946 4.827-.413.112-.848.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.374 4.6 3.414-1.68 1.318-3.809 2.102-6.102 2.102-.394 0-.779-.023-1.158-.067 2.179 1.396 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 14.307-14.406 0-.219-.006-.436-.016-.653.984-.71 1.834-1.597 2.506-2.61z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
