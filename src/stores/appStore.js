// store.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchCategories, fetchSingleProduct, fetchProducts } from '../api/api';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    products: [],
    originalProducts: [],
    categories: [],
    filterItem: 'All categories',
    loading: false,
    error: null,
    pageLoading: false,
    pages: {
      productPages: [],
      authPages: [],
      cartPages: [],
    },
    currentLocation: '',
    pageName: '',
  }),
  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
    setProducts(products) {
      this.products = products;
    },
    setOriginalProducts(originalProducts) {
      this.originalProducts = originalProducts;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    setPageLoading(pageLoading) {
      this.pageLoading = pageLoading;
    },
    async fetchCategories() {
        await fetchCategories(this);
    },
    async fetchSingleProduct(id) {
        await fetchSingleProduct(id);
    },
    async fetchProducts() {
        await fetchProducts(this);
    },
    async fetchFavourites(objectArray) {
      this.loading = true;
      try {
        const ids = [...new Set(Object.values(objectArray))];
        const promises = ids.map(id => this.fetchSingleProduct(parseInt(id)));
        const results = await Promise.all(promises);

        const list = results.map(result => result.response).filter(response => response);

        if (list.length > 0) {
          this.products = list;
          this.originalProducts = JSON.parse(JSON.stringify(list));
        }
      } catch (error) {
        this.error = {
          status: error.response.status,
          message: 'Data fetching failed :( , please check your network connection and reload.',
          type: 'network/fetch',
        };
      } finally {
        this.sortProducts();
        this.searchProducts();
        this.loading = false;
        setTimeout(() => {
          this.pageLoading = false;
        }, 1000);
      }
    },
    sortProducts() {
      // Implement sorting logic here
    },
    searchProducts() {
      // Implement search logic here
    }
  },
  getters: {},
});
