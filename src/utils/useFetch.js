import { ref, reactive, watchEffect, toValue } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://fakestoreapi.com/products/'

/**
 * Custom hook for fetching data from a given URL using Axios.
 * This hook returns reactive objects for the fetched data, error state, and fetching state.
 *
 * @param {string|Ref<string>} url - The URL to fetch data from. Can be a string or a ref containing a string.
 * @returns {Object} - An object containing the following reactive properties:
 *  - data: The fetched data.
 *  - error: Any error that occurred during the fetch.
 *  - fetching: Boolean indicating whether the fetch is in progress.
 */
export function useFetch(url) {
  const data = reactive({ value: null })
  const error = reactive({ value: null })
  const fetching = ref(false)

  /**
   * Fetch data from the given URL.
   * Sets the fetching state to true before the request and to false after the request completes.
   * Updates the data or error state based on the request outcome.
   */
  const fetchData = async () => {
    fetching.value = true
    data.value = null
    error.value = null

    try {
      const response = await axios.get(toValue(url))
      if (response.status !== 200) {
        throw response
      }
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      fetching.value = false
    }
  }

  /**
   * Watch the effect to fetch data whenever the URL changes.
   * This ensures the data is always up-to-date based on the provided URL.
   */
  watchEffect(() => {
    fetchData()
  })

  return { data, error, fetching }
}
