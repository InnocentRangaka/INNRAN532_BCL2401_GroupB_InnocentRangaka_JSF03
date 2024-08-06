import { watch, watchEffect } from 'vue';
import { useFetch } from '../utils/useFetch';

{/* <script setup> */}
// re-fetch when props.id changes
{/* const { data, error } = useFetch(() => `/posts/${props.id}`) */}
// </script>

const API_URL = 'https://fakestoreapi.com/products/'

// src/api/Api.js

/**
 * Fetches categories from the Fake Store API.
 * @returns {Promise<{response: string[], error: null} | {error: any, response: null}>} An object containing the response data or an error.
 */
export const fetchCategories = async (app) => {
  const { data, error, fetching } = await useFetch(`/categories`);
  while (fetching.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  watchEffect(() => {
    if (!fetching.value) {
      if (error.value) {
        app.setError({
          status: error.status,
          message: 'Data fetching failed :( , please check your network connection and reload.',
          type: 'network/fetch',
        })

        return;
      }
      
      if (data.value) {
        app.setCategories(data.value)
        // app.setLoading(false)
      }
    }
  })

  return {data, error, fetching };
};
  
  /**
   * Fetches a single product by ID from the Fake Store API.
   * @param {number} id - The ID of the product to fetch.
   * @returns {Promise<{response: Object, error: null} | {error: any, response: null}>} An object containing the product data or an error.
   */
  export const fetchSingleProduct = async (id, app) => {
    app.setViewProduct([]);
    app.setProductsLoading(true);

    const { data, error, fetching } = await useFetch(`/${id}`);
    while (fetching.value) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  
    watchEffect(() => {
      if (!fetching.value) {
        if (error.value) {
          app.setError({
            status: error.status,
            message: 'Data fetching failed :( , please check your network connection and reload.',
            type: 'network/fetch',
          })
  
          return;
        }
        
        if (data.value) {
          // console.log(data.value)
          app.setViewProduct(data.value);
          app.setProductsLoading(false);
          setTimeout(() => {
            app.setPageLoading(false);
          }, 1000);
        }
      }
    })
  
    return {data, error, fetching };
  };
  
  /**
   * Fetches products from the Fake Store API based on the selected category or all products if no category is selected.
   * @param {Object} app - The application state object.
   * @returns {Promise<void>} Updates the application state with fetched products and handles loading state.
   */
export const fetchProducts = async (app) => {
  app.setProductsLoading(true);

  const url = app.filterItem !== 'All categories'
    ? `/category/${app.filterItem}`
    : `/`;

  const { data, error, fetching } = await useFetch(url);

  // Watch fetching to detect when the request is completed
  watch(fetching, async (isFetching) => {
    if (!isFetching) {
      if (error.value) {
        app.setError({
          status: error.value.status,
          message: 'Data fetching failed :( , please check your network connection and reload.',
          type: 'network/fetch',
        });
      } else if (data.value) {
        app.setProducts(data.value);
        app.setOriginalProducts(JSON.parse(JSON.stringify(data.value)));
        app.searchProducts();
        app.sortProducts();
      }
    }
  });

  // Return data, error, and fetching for further use if needed
  return { data, error, fetching };
};

  
export const fetchFavourites = async (objectArray, app) => {
  app.setProductsLoading(true);

  const ids = [...new Set(Object.values(objectArray))];
  const promises = ids.map(id => useFetch(`/${id}`));

  const results = await Promise.all(promises);

  let list = [];
  let errorOccurred = false;

  await Promise.all(
    results.map(async ({ data, error, fetching }) => {
      return new Promise((resolve) => {
        watch(fetching, (isFetching) => {
          if (!isFetching) {
            if (error.value) {
              errorOccurred = true;
              app.setError({
                status: error.value.status,
                message: 'Data fetching failed :( , please check your network connection and reload.',
                type: 'network/fetch',
              });
            } else if (data.value) {
              list.push(data.value);
            }
            resolve();
          }
        });
      });
    })
  );

  if (!errorOccurred && list.length > 0) {
    app.setProducts(list);
    app.setOriginalProducts(JSON.parse(JSON.stringify(list)));
    app.searchProducts();
    app.sortProducts();
  }

  app.setProductsLoading(false);

  setTimeout(() => {
    app.pageLoading = false;
  }, 1000);

  return { list, error: errorOccurred };
};
