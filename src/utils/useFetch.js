// fetch.js
import { ref, reactive, watchEffect, toValue } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://fakestoreapi.com/products/'

export function useFetch(url) {
  const data = reactive({value: null})
  const error = reactive({value: null})
  const fetching = ref(false)

  const fetchData = async () => {
    // reset state before fetching..
    fetching.value = true
    data.value = null
    error.value = null

    try {
      const response = await axios.get(toValue(url));
      if(response.status !== 200){
        throw response
      }
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      fetching.value = false
      // console.log('Done fetching', data.value)
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, fetching }
}