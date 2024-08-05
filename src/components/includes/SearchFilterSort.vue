<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const app = computed(() => store.state)
const currentLocation = computed(() => store.state.currentLocation)
const currentQuery = computed(() => store.state.currentLocation.query)
const searchTerm = ref(store.state.searchTerm)
const filterItem = ref(store.state.filterItem)
const dropdownOpen = ref(store.state.dropdownOpen)
const sorting = ref(store.state.sorting)
const categories = computed(() => store.state.categories)

const toggleFilterDropdown = () => {
  store.commit('toggleDropdown')
}

const setFilterItem = (item, clicked = true) => {
  store.commit('setFilterItem', item)
  if (clicked) updateURL()
  store.dispatch('fetchProducts')
}

const searchProducts = (term, clicked = true) => {
  store.commit('setSearchTerm', term)
  let stateProducts = store.state.originalProducts

  let searchedProducts =
    searchTerm.value.trim() !== ''
      ? stateProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      : stateProducts

  if (clicked) updateURL()

  store.commit('setProducts', searchedProducts)
}

const sortProducts = (sort, clicked = true) => {
  store.commit('setSorting', sort)
  let stateProducts = store.state.originalProducts

  let sortedProducts =
    sort !== 'default'
      ? [...stateProducts].sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price))
      : stateProducts

  if (clicked) updateURL()

  store.commit('setProducts', sortedProducts)
}

const capitalizeFirstLetters = (str) => {
  return str ? str.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()) : null
}

const handleSearchParams = () => {
  let params = new URLSearchParams(window.location.search)
  let query = new URLSearchParams(window.location.query)

  let filter = params.get('filter') || query.get('filter') || currentQuery.value?.filter || ''
  let sort = params.get('sort') || query.get('sort') || currentQuery.value?.sort || ''
  let search = params.get('search') || query.get('search') || currentQuery.value?.search || ''

  if (search && search !== 'undefined') searchProducts(search, false)
  if (filter && filter !== 'undefined') setFilterItem(filter, false)
  if (sort && sort !== 'undefined') sortProducts(sort, false)
}

const updateURL = () => {
  let params = new URLSearchParams()
  if (filterItem.value !== 'All categories') params.set('filter', filterItem.value)
  if (sorting.value && sorting.value !== 'default') params.set('sort', sorting.value)
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
}

onMounted(handleSearchParams)
</script>

<template>
  <div
    class="container grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto px-2 md:px-0 justify-center"
  >
    <!-- Filter -->
    <form @submit.prevent="searchProducts(searchTerm)">
      <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
        <button
          @click="toggleFilterDropdown"
          id="dropdown-button"
          class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center justify-center place-content-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
          type="button"
          title="filter button"
        >
          {{ capitalizeFirstLetters(filterItem) }}
          <svg
            class="w-2.5 h-2.5 ms-2.5"
            :class="{ 'rotate-180': dropdownOpen, 'rotate-0': !dropdownOpen }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          v-if="dropdownOpen"
          id="dropdown"
          class="z-10 block absolute top-[100%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
            <li>
              <button
                @click="setFilterItem('All categories')"
                type="button"
                class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                All categories
              </button>
            </li>
            <li v-for="category in categories" :key="category">
              <button
                @click="setFilterItem(category)"
                type="button"
                class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                {{ capitalizeFirstLetters(category) }}
              </button>
            </li>
          </ul>
        </div>
        <div class="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            name="searchInput"
            class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            v-model="searchTerm"
            @input="searchProducts(searchTerm)"
          />
          <button
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>

    <div class="flex w-full items-end justify-end">
      <!-- Sort -->
      <div class="flex max-w-[21rem] w-full">
        <label for="sort" class="w-20 my-auto mr-2 font-semibold">Sort by:</label>
        <select
          @change="sortProducts($event.target.value)"
          v-model="sorting"
          id="sort"
          class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="default">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </div>
  </div>
</template>
