// store.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchCategories, fetchSingleProduct, fetchProducts, fetchFavourites } from '../api/api';
import { calculateSubTotalAmount, calculateTaxAmount, calculateCartTotal } from '../utils/utils'

export const useAppStore = defineStore('appStore', {
  state: () => ({

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
    currency: '$',
    taxRate: Number(15),
    shippingRate: 0,
    shippingCost: {
      standard: Number(5),
      express: Number(16.00)
    },
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
    wishList: {
      items: {},
      totalItems: 0
    },

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
      previous: {
        path: '',
        params: '',
        query: '',
        route: '',
        userData: '',
        componentName: '',
      }
    },

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
    setOriginalProducts(products) {
      this.originalProducts = products;
    },
    setViewProduct(product) {
      this.viewProduct = product;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setProductsLoading(loading) {
      if (typeof this.loading !== 'object') {
        this.loading = {
          products: true,
          cart: false,
          page: true,
        };
      }
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
        await fetchSingleProduct(id, this);
    },
    async fetchProducts() {
        await fetchProducts(this);
    },
    async fetchFavourites(objectArray) {
      await fetchFavourites(objectArray, this)
    },
    addToFavourites(id) {
      const newWishList = { ...this.wishList.items };
      if (newWishList[id]) {
        delete newWishList[id];
      } else {
        newWishList[id] = true;
      }

      this.showToast('Product added to wishlist!');

      this.wishList = {
        items: newWishList, 
        totalItems: Object.entries(newWishList).length
      };

    },
    setSearchTerm(term){
      this.searchTerm = term;
    },
    setFilterItem(term){
      this.filterItem = term;
    },
    setSorting(term){
      this.sorting = term;
    },
    sortProducts() {
      const sortingTerm = this.sorting
      switch (sortingTerm) {
        case 'low':
        case 'high':
          this.products = Object.values(this.products).sort((a, b) => sortingTerm === 'low' ? a.price - b.price : b.price - a.price);
          break;
        case 'A-Z':
        case 'Z-A':
          this.products = Object.values(this.products).sort((a, b) => sortingTerm === 'A-Z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
          break;
        case 'lowRating':
        case 'highRating':
          this.products = Object.values(this.products).sort((a, b) => sortingTerm === 'lowRating' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate);
          break;
        case 'categoryA-Z':
        case 'categoryZ-A':
          this.products = Object.values(this.products).sort((a, b) => sortingTerm === 'categoryA-Z' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
          break;
        case 'default':
          this.products = JSON.parse(JSON.stringify(this.originalProducts));
          break;
        default:
          // Erroy unexpected sortingTerm values
          this.error = {
            status: 'invalid value',
            message: `Invalid sortingTerm: '${sortingTerm}'`,
            type: 'sorting',
          };
          break;
      }      
    },
    searchProducts() {
      const searchTerm = this.searchTerm,
      thisProducts = this.getOriginalProducts,
      term = searchTerm.toString().toLowerCase()
      let searchedProducts;

      if(term.trim() != ''){
        const filteredProducts = Object.values(thisProducts).filter((product) => product.title.toLowerCase().includes(term));
        searchedProducts = JSON.parse(JSON.stringify(filteredProducts));
      }
      else {
        searchedProducts = JSON.parse(JSON.stringify(thisProducts));
      }

      this.products = searchedProducts;
    },
    showToast(message) {
      if(this.toast.visible || this.toast.display){
        this.toast.visible = false
        this.toast.display = false
        this.toast.message = '';
      }

      this.toast.message = message;
      this.toast.visible = true
      this.toast.display = true
      
      if (this.toast.interval) {
        // closeToast()
        clearInterval(this.toast.interval);
        this.toast.interval = null;
      }
  
      if (this.toast.timeout) {
        clearTimeout(this.toast.timeout);
        this.toast.timeout = null;
      }

      this.toast.timeout = setTimeout(() => {
        this.toast.visible = false;
        this.toast.timeout = null;
      }, this.toast.delay);
  
      const startDate = Date.now();
      const futureDate = startDate + this.toast.delay;

      this.toast.interval = setInterval(() => {
        const dateNow = Date.now();
        this.toast.percent = Math.floor((dateNow - startDate) * 100 / (futureDate - startDate));
        if (this.toast.percent >= 100) {
          clearInterval(this.toast.interval);
          this.toast.interval = null;
        }
      }, 30);
    },
    closeToast() {
      this.toast.visible = false;
      clearInterval(this.toast.interval);
      this.toast.interval = null;
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
      const cartTaxAmount = calculateTaxAmount(newCartItems, this.taxRate);
      const cartTotalAmount = calculateCartTotal(newCartItems, this.taxRate, this.shippingRate);

      this.showToast('Product added to cart!');

      this.cart = { 
        ...this.cart,
        cartItems: newCartItems,
        totalItems: cartTotalItems,
        subTotalAmount: cartSubTotalAmount,
        taxAmount: cartTaxAmount,
        totalAmount: cartTotalAmount,
      };

      // console.log(this.cart)
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
      return state.viewProduct;
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
      return Object.prototype.hasOwnProperty.call(state.wishList.items, id);
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
    getFilterItem:(state)=>{
      return state.filterItem;
    },
    getSorting:(state)=>{
      return state.sorting;
    },
  },
});
