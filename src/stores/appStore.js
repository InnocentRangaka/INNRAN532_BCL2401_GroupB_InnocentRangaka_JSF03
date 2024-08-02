// store.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchCategories, fetchSingleProduct, fetchProducts } from '../api/api';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    currency: '$',
    categories: [''],
    filterItem: 'All categories',

    // Products and loading state
    viewProduct: [],
    products: [],
    originalProducts: [],
    selectedProduct: {},
    loading: {
      products: true,
      cart: false,
      page: true,
    },
    error: null,
    pageLoading: true,

    // Sorting and filtering
    sorting: 'default',
    searchTerm: '',
    filterItem: 'All categories',
    categories: [],

    // UI state
    dropdownOpen: false,
    disabledClass: 'disabled:opacity-75',
    cursorPointerClass: 'cursor-pointer',
    cursorNotAllowed: 'cursor-not-allowed',

    // Cart management
    cart: {
      isAddingToCart: false,
      addToCartText: 'Add To Cart',
      shippingRate: 0,
      shippingMethod: 'standard',
      cartItems: {},
      totalItems: 0, 
      subTotalAmount: 0, 
      taxAmount: 0,
      totalAmount: 0,
    },

    // Wishlist management
    wishList: {},

    // Page navigation
    pageName: null,
    pages: {
      productPages: ['home', 'wishlist', 'products', 'product'],
      authPages: ['login', 'signup'],
      cartPages: ['cart', 'checkout'],
    },

    currentLocation: {
      path: '',
      params: '',
      query: '',
      route: '',
      userData: '',
      componentName: '',
    },
    pageName: '',

    // Toast
    /**
     * Toast object.
     */
    toast: {
      visible: false, // Flag indicating toast visibility.
      delay: 5000, // Toast delay.
      percent: 0, // Toast progress percentage.
      interval: null, // Toast interval.
      message: null, // Toast message.
      display: null, // Toast display component.
    },
  }),
  actions: {
    formatPrice: (price) => price.toFixed(2),
    setCategories(categories) {
      this.categories = categories;
    },
    setProducts(products) {
      this.products = products;
    },
    setOriginalProducts(originalProducts) {
      this.originalProducts = originalProducts;
    },
    setViewProduct(product) {
      this.viewProduct = product;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setProductsLoading(loading) {
      this.loading.products = loading;
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
    setFilterItem(term){
      this.filterItem = term;
    },
    sortProducts() {
      // Implement sorting logic here
    },
    searchProducts() {
      // Implement search logic here
    },
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = '';
      }, 3000);
    },
    addToCart(item, eventTarget = null) {
      const newCartItems = { ...this.cart.cartItems };
      if (newCartItems[item.id]) {
        newCartItems[item.id].quantity += 1;
        newCartItems[item.id].totalPrice = newCartItems[item.id].quantity * item.price;
      } else {
        const hasQuantity = item.quantity ? item.quantity : 1;
        newCartItems[item.id] = { 
          ...item, 
          quantity: hasQuantity, 
          totalPrice: item.price,
          quantityUpdating: false,
          removeItem: false,
        };
      }
      const cartTotalItems = Object.keys(newCartItems).length;
      const cartSubTotalAmount = calculateSubTotalAmount(newCartItems);
      const cartTaxAmount = calculateTaxAmount(newCartItems);
      const cartTotalAmount = calculateCartTotal(newCartItems);

      this.showToast('Product added to cart!');

      this.cart = { 
        ...this.cart,
        cartItems: newCartItems,
        totalItems: cartTotalItems,
        subTotalAmount: cartSubTotalAmount,
        taxAmount: cartTaxAmount,
        totalAmount: cartTotalAmount,
      };
    },
  },
  getters: {
    getCategories: (state) => {
      return state.categories;
    },
    getCategory: (state) => (urlCategory) => {
      return state.getCategories
        ? state.getCategories.find((categoryName) => categoryName.startsWith(urlCategory))
        : undefined
    },
    getProductsByCategory: (state) => (category) => {
      return state.products.filter((product) => product.category === category);
    },
    getProducts: (state) => {
      if (state.filterItem === 'All categories') {
        return state.products;
      } else {
        return state.products.filter((product) => product.category === state.filterItem);
      }
    },
    getOriginalProducts: (state) => {
      return state.originalProducts;
    },
    getSingleProduct: (state) => {
      return state.products;
    },
    getCart: (state) => {
      return state.cart;
    },
    // getCart: (state) => {
    //   return state.products.filter((product) => state.cart[product.id]);
    // },
    getCartTotal: (state) => {
      return state.cart.totalItems;
    },
    getCartTotalPrice: (state) => {
      return state.cart.totalPrice;
    },
    getFavourites: (state) => {
      return state.products.filter((product) => state.wishList[product.id]);
    },
    getWishList: (state) => {
      return state.wishList;
    },
    isInWishList: (state) => (id) => {
      return () => state.wishList.hasOwnProperty(id);
    },
    getWishListTotal: (state) => {
      return state.wishList.totalItems;
    },
    getWishListTotalPrice: (state) => {
      return state.wishList.totalPrice;
    },
    getLoading: (state) => {
      return state.loading;
    },
    getError: (state) => {
      return state.error;
    },
    getPageLoading: (state) => {
      return state.pageLoading;
    },
    getPages: (state) => {
      return state.pages;
    },
    getCurrentLocation: (state) => {
      return state.currentLocation;
    },
    getPageName: (state) => {
      return state.pageName;
    },
  },
});
