import { defineStore } from 'pinia';
import { fetchCategories, fetchSingleProduct, fetchProducts, fetchFavourites } from '../api/api';
import { calculateSubTotalAmount, calculateTaxAmount, calculateCartTotal, parseObjectToArray } from '../utils/utils'

/**
 * App store definition using Pinia.
 * @type {import('pinia').StoreDefinition}
 */
export const useAppStore = defineStore('appStore', {
  state: () => ({

    // Products and loading state
    /**
     * Array to hold the products for view.
     * @type {Array<Object>}
     */
    viewProduct: [],

    /**
     * Array to hold all products.
     * @type {Array<Object>}
     */
    products: [],

    /**
     * Array to hold original products for reference.
     * @type {Array<Object>}
     */
    originalProducts: [],

    /**
     * Object to hold the selected product details.
     * @type {Object}
     */
    selectedProduct: {},

    /**
     * Loading states for different parts of the application.
     * @type {Object}
     */
    loading: {
      /**
       * Loading state for products.
       * @type {boolean}
       */
      products: true,

      /**
       * Loading state for cart actions.
       * @type {boolean}
       */
      cart: false,

      /**
       * Loading state for page transitions.
       * @type {boolean}
       */
      page: true,
    },

    /**
     * Error message or object for application errors.
     * @type {string|null}
     */
    error: null,

    /**
     * Overall page loading state.
     * @type {boolean}
     */
    pageLoading: true,

    // Sorting and filtering
    /**
     * Current sorting method.
     * @type {string}
     */
    sorting: 'default',

    /**
     * Current search term for filtering products.
     * @type {string}
     */
    searchTerm: '',

    /**
     * Current filter item (e.g., category).
     * @type {string}
     */
    filterItem: 'All categories',

    /**
     * List of product categories.
     * @type {Array<Object>}
     */
    categories: [],

    // UI state
    /**
     * State of the dropdown menu (open/closed).
     * @type {boolean}
     */
    dropdownOpen: false,

    /**
     * CSS class for disabled state.
     * @type {string}
     */
    disabledClass: 'disabled:opacity-75',

    /**
     * CSS class for pointer cursor.
     * @type {string}
     */
    cursorPointerClass: 'cursor-pointer',

    /**
     * CSS class for not-allowed cursor.
     * @type {string}
     */
    cursorNotAllowed: 'cursor-not-allowed',

    // Cart management
    /**
     * Currency symbol used in the application.
     * @type {string}
     */
    currency: '$',

    /**
     * Tax rate applied to purchases.
     * @type {number}
     */
    taxRate: Number(15),

    /**
     * Current shipping rate.
     * @type {number}
     */
    shippingRate: 0,

    /**
     * Shipping cost options.
     * @type {Object}
     */
    shippingCost: {
      /**
       * Standard shipping cost.
       * @type {number}
       */
      standard: Number(5),

      /**
       * Express shipping cost.
       * @type {number}
       */
      express: Number(16.00)
    },

    /**
     * Cart management object.
     * @type {Object}
     */
    cart: {
      /**
       * Flag indicating if an item is being added to the cart.
       * @type {boolean}
       */
      isAddingToCart: false,

      /**
       * Text displayed on the add to cart button.
       * @type {string}
       */
      addToCartText: 'Add To Cart',

      /**
       * Current shipping rate for the cart.
       * @type {number}
       */
      shippingRate: 0,

      /**
       * Selected shipping method for the cart.
       * @type {string}
       */
      shippingMethod: 'standard',

      /**
       * Items in the cart.
       * @type {Object}
       */
      cartItems: {},

      /**
       * Total number of items in the cart.
       * @type {number}
       */
      totalItems: 0,

      /**
       * Subtotal amount for the items in the cart.
       * @type {number}
       */
      subTotalAmount: 0,

      /**
       * Tax amount for the items in the cart.
       * @type {number}
       */
      taxAmount: 0,

      /**
       * Total amount for the cart including tax and shipping.
       * @type {number}
       */
      totalAmount: 0,
    },

    // Wishlist management
    /**
     * Wishlist management object.
     * @type {Object}
     */
    wishList: {
      /**
       * Items in the wishlist.
       * @type {Object}
       */
      items: {},

      /**
       * Total number of items in the wishlist.
       * @type {number}
       */
      totalItems: 0
    },

    // Page navigation
    /**
     * Current page name.
     * @type {string|null}
     */
    pageName: null,

    /**
     * Object containing arrays of different page categories.
     * @type {Object}
     */
    pages: {
      /**
       * Product-related pages.
       * @type {Array<string>}
       */
      productPages: ['home', 'wishlist', 'products', 'product'],

      /**
       * Authentication-related pages.
       * @type {Array<string>}
       */
      authPages: ['login', 'signup'],

      /**
       * Cart-related pages.
       * @type {Array<string>}
       */
      cartPages: ['cart', 'checkout'],
    },

    /**
     * Object containing current location details.
     * @type {Object}
     */
    currentLocation: {
      /**
       * Current path.
       * @type {string}
       */
      path: '',

      /**
       * Current URL parameters.
       * @type {string}
       */
      params: '',

      /**
       * Current URL query string.
       * @type {string}
       */
      query: '',

      /**
       * Current route name.
       * @type {string}
       */
      route: '',

      /**
       * User data related to the current location.
       * @type {string}
       */
      userData: '',

      /**
       * Current component name.
       * @type {string}
       */
      componentName: '',

      /**
       * Object containing previous location details.
       * @type {Object}
       */
      previous: {
        /**
         * Previous path.
         * @type {string}
         */
        path: '',

        /**
         * Previous URL parameters.
         * @type {string}
         */
        params: '',

        /**
         * Previous URL query string.
         * @type {string}
         */
        query: '',

        /**
         * Previous route name.
         * @type {string}
         */
        route: '',

        /**
         * User data related to the previous location.
         * @type {string}
         */
        userData: '',

        /**
         * Previous component name.
         * @type {string}
         */
        componentName: '',
      }
    },

    /**
     * Toast object for notifications.
     * @type {Object}
     */
    toast: {
      /**
       * Flag indicating toast visibility.
       * @type {boolean}
       */
      visible: false,

      /**
       * Toast delay in milliseconds.
       * @type {number}
       */
      delay: 5000,

      /**
       * Toast progress percentage.
       * @type {number}
       */
      percent: 0,

      /**
       * Toast interval ID.
       * @type {number|null}
       */
      interval: null,

      /**
       * Toast message.
       * @type {string|null}
       */
      message: null,

      /**
       * Toast display component.
       * @type {string|null}
       */
      display: null,
    },
  }),

  actions: {
    /**
     * Formats a given price to two decimal places.
     * @param {number} price - The price to format.
     * @returns {string} - The formatted price.
     */
    formatPrice: (price) => price.toFixed(2),

    /**
     * Sets the categories in the state.
     * @param {Array<Object>} categories - The categories to set.
     */
    setCategories(categories) {
      this.categories = categories;
    },

    /**
     * Sets the products in the state.
     * @param {Array<Object>} products - The products to set.
     */
    setProducts(products) {
      this.products = products;
    },

    /**
     * Sets the original products in the state.
     * @param {Array<Object>} products - The original products to set.
     */
    setOriginalProducts(products) {
      this.originalProducts = products;
    },

    /**
     * Sets the product to view in the state.
     * @param {Object} product - The product to set for viewing.
     */
    setViewProduct(product) {
      this.viewProduct = product;
    },

    /**
     * Sets the loading state.
     * @param {Object} loading - The loading state to set.
     */
    setLoading(loading) {
      this.loading = loading;
    },

    /**
     * Sets the loading state for products.
     * @param {boolean} loading - The loading state for products.
     */
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

    /**
     * Sets the error state.
     * @param {string} error - The error message to set.
     */
    setError(error) {
      this.error = error;
    },

    /**
     * Sets the page loading state.
     * @param {boolean} pageLoading - The page loading state to set.
     */
    setPageLoading(pageLoading) {
      this.pageLoading = pageLoading;
    },

    /**
     * Fetches categories and updates the state.
     * @returns {Promise<void>}
     */
    async fetchCategories() {
      await fetchCategories(this);
    },

    /**
     * Fetches a single product by ID and updates the state.
     * @param {number|string} id - The ID of the product to fetch.
     * @returns {Promise<void>}
     */
    async fetchSingleProduct(id) {
      await fetchSingleProduct(id, this);
    },

    /**
     * Fetches all products and updates the state.
     * @returns {Promise<void>}
     */
    async fetchProducts() {
      await fetchProducts(this);
    },

    /**
     * Fetches favourite products and updates the state.
     * @param {Array<Object>} objectArray - The array of favourite products to fetch.
     * @returns {Promise<void>}
     */
    async fetchFavourites(objectArray) {
      await fetchFavourites(objectArray, this);
    },

    /**
     * Adds or removes a product from the wishlist.
     * @param {number|string} id - The ID of the product to add or remove.
     */
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

    /**
     * Sets the search term for product filtering.
     * @param {string} term - The search term to set.
     */
    setSearchTerm(term){
      this.searchTerm = term;
    },

    /**
     * Sets the filter item for product filtering.
     * @param {string} term - The filter item to set.
     */
    setFilterItem(term){
      this.filterItem = term;
    },

    /**
     * Sets the sorting term for products.
     * @param {string} term - The sorting term to set.
     */
    setSorting(term){
      this.sorting = term;
    },

    /**
     * Sorts the products based on the current sorting term.
     */
    sortProducts() {
      const sortingTerm = this.sorting;
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
          // Error unexpected sortingTerm values
          this.error = {
            status: 'invalid value',
            message: `Invalid sortingTerm: '${sortingTerm}'`,
            type: 'sorting',
          };
          break;
      }      
    },

    /**
     * Searches for products based on the current search term.
     */
    searchProducts() {
      const searchTerm = this.searchTerm;
      const thisProducts = this.getOriginalProducts;
      const term = searchTerm.toString().toLowerCase();
      let searchedProducts;

      if(term.trim() !== ''){
        const filteredProducts = Object.values(thisProducts).filter((product) => product.title.toLowerCase().includes(term));
        searchedProducts = JSON.parse(JSON.stringify(filteredProducts));
      } else {
        searchedProducts = JSON.parse(JSON.stringify(thisProducts));
      }

      this.products = searchedProducts;
    },

    /**
     * Shows a toast notification with a given message.
     * @param {string} message - The message to display in the toast.
     */
    showToast(message) {
      if(this.toast.visible || this.toast.display){
        this.toast.visible = false;
        this.toast.display = false;
        this.toast.message = '';
      }

      this.toast.message = message;
      this.toast.visible = true;
      this.toast.display = true;
      
      if (this.toast.interval) {
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

    /**
     * Closes the currently visible toast notification.
     */
    closeToast() {
      this.toast.visible = false;
      clearInterval(this.toast.interval);
      this.toast.interval = null;
    },

    /**
     * Adds an item to the cart.
     * @param {Object} item - The item to add to the cart.
     */
    addToCart(item) {
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

      this.updateCart(newCartItems, 'Product added to cart!');
    },

    /**
     * Updates the cart with new items and optionally shows a toast message.
     * @param {Object} newCartItems - The new cart items.
     * @param {string} [toastMessage=''] - The message to display in the toast.
     */
    updateCart(newCartItems, toastMessage='') {
      const cartTotalItems = Object.keys(newCartItems).length;
      const cartSubTotalAmount = calculateSubTotalAmount(newCartItems);
      const cartTaxAmount = calculateTaxAmount(newCartItems, this.taxRate);
      const cartTotalAmount = calculateCartTotal(newCartItems, this.taxRate, this.shippingRate);

      if(toastMessage){this.showToast(toastMessage);}

      this.cart = { 
        ...this.cart,
        cartItems: newCartItems,
        totalItems: cartTotalItems,
        subTotalAmount: cartSubTotalAmount,
        taxAmount: cartTaxAmount,
        totalAmount: cartTotalAmount,
      };
    },

    /**
     * Removes an item from the cart after a delay.
     * @param {Object} item - The item to remove from the cart.
     * @param {HTMLElement} el - The HTML element associated with the removal action.
     */
    removeCartItem(item, el){
      if (el.hasAttribute('disabled')) return;
    
      this.disableElement(el);
      
      const findItemInCart = this.isInCartItems(item.id, this.cart.cartItems);

      if (findItemInCart) {
        const cartItems = Object.values(parseObjectToArray(this.cart.cartItems));
        const index = cartItems.indexOf(findItemInCart);
        cartItems[index].removeItem = true;

        setTimeout(() => {
          const newCartItems = [...cartItems];
          newCartItems.splice(newCartItems.indexOf(item), 1);
          this.disableElement(el, false);

          this.updateCart(newCartItems, 'Item removed successfully!');

          if (cartItems[index]) {
            cartItems[index].removeItem = false;
          }
        }, 2000);
      }
    },

    /**
     * Checks if an item is in the cart.
     * @param {number|string} id - The ID of the item to check.
     * @param {Object} object - The cart items object.
     * @returns {Object|boolean} - The item if found, otherwise false.
     */
    isInCartItems: (id, object) => {
      const parsedObject = parseObjectToArray(object);
      return Object.values(parsedObject).find(item => item.id === id) || false;
    },

    /**
     * Disables or enables an HTML element.
     * @param {HTMLElement} el - The element to disable or enable.
     * @param {boolean} [boolean=true] - Whether to disable (true) or enable (false) the element.
     */
    disableElement(el, boolean = true){
      if(!boolean){
        el.removeAttribute('disabled');
        el.classList.remove(this.disabledClass);
        el.classList.remove(this.cursorNotAllowed);
        el.classList.remove(this.cursorPointerClass);
        return;
      }

      el.setAttribute('disabled', true);
      el.classList.toggle(this.disabledClass);
      el.classList.toggle(this.cursorNotAllowed);
      el.classList.toggle(this.cursorPointerClass);
    },
  },
  getters: {
    /**
     * Gets all categories.
     * @param {Object} state - The state object.
     * @returns {Array<Object>} - The categories.
     */
    getCategories: (state) => {
      return state.categories;
    },

    /**
     * Gets a specific category based on the URL category.
     * @param {Object} state - The state object.
     * @returns {Function} - A function that takes a URL category and returns the category.
     */
    getCategory: (state) => (urlCategory) => {
      return state.getCategories
        ? state.getCategories.find((categoryName) => categoryName.startsWith(urlCategory))
        : undefined;
    },

    /**
     * Gets products by category.
     * @param {Object} state - The state object.
     * @returns {Function} - A function that takes a category and returns the products in that category.
     */
    getProductsByCategory: (state) => (category) => {
      return state.products.filter((product) => product.category === category);
    },

    /**
     * Gets all products or filters them by category.
     * @param {Object} state - The state object.
     * @returns {Array<Object>} - The products.
     */
    getProducts: (state) => {
      if (state.filterItem === 'All categories') {
        return state.products;
      } else {
        return state.products.filter((product) => product.category === state.filterItem);
      }
    },

    /**
     * Gets the original products.
     * @param {Object} state - The state object.
     * @returns {Array<Object>} - The original products.
     */
    getOriginalProducts: (state) => {
      return state.originalProducts;
    },

    /**
     * Gets a single product for viewing.
     * @param {Object} state - The state object.
     * @returns {Object} - The product to view.
     */
    getSingleProduct: (state) => {
      return state.viewProduct;
    },

    /**
     * Gets the cart.
     * @param {Object} state - The state object.
     * @returns {Object} - The cart.
     */
    getCart: (state) => {
      return state.cart;
    },

    /**
     * Gets the total number of items in the cart.
     * @param {Object} state - The state object.
     * @returns {number} - The total number of items in the cart.
     */
    getCartTotal: (state) => {
      return state.cart.totalItems;
    },

    /**
     * Gets the total price of items in the cart.
     * @param {Object} state - The state object.
     * @returns {number} - The total price of items in the cart.
     */
    getCartTotalPrice: (state) => {
      return state.cart.totalPrice;
    },

    /**
     * Gets the favourite products.
     * @param {Object} state - The state object.
     * @returns {Array<Object>} - The favourite products.
     */
    getFavourites: (state) => {
      return state.products.filter((product) => state.wishList.items[product.id]);
    },

    /**
     * Gets the wishlist.
     * @param {Object} state - The state object.
     * @returns {Object} - The wishlist.
     */
    getWishList: (state) => {
      return state.wishList;
    },

    /**
     * Checks if a product is in the wishlist.
     * @param {Object} state - The state object.
     * @returns {Function} - A function that takes a product ID and returns true if the product is in the wishlist, otherwise false.
     */
    isInWishList: (state) => (id) => {
      return Object.prototype.hasOwnProperty.call(state.wishList.items, id);
    },

    /**
     * Gets the total number of items in the wishlist.
     * @param {Object} state - The state object.
     * @returns {number} - The total number of items in the wishlist.
     */
    getWishListTotal: (state) => {
      return state.wishList.totalItems;
    },

    /**
     * Gets the total price of items in the wishlist.
     * @param {Object} state - The state object.
     * @returns {number} - The total price of items in the wishlist.
     */
    getWishListTotalPrice: (state) => {
      return state.wishList.totalPrice;
    },

    /**
     * Gets the loading state.
     * @param {Object} state - The state object.
     * @returns {Object} - The loading state.
     */
    getLoading: (state) => {
      return state.loading;
    },

    /**
     * Gets the error state.
     * @param {Object} state - The state object.
     * @returns {string} - The error message.
     */
    getError: (state) => {
      return state.error;
    },

    /**
     * Gets the page loading state.
     * @param {Object} state - The state object.
     * @returns {boolean} - The page loading state.
     */
    getPageLoading: (state) => {
      return state.pageLoading;
    },

    /**
     * Gets the pages configuration.
     * @param {Object} state - The state object.
     * @returns {Object} - The pages configuration.
     */
    getPages: (state) => {
      return state.pages;
    },

    /**
     * Gets the current location.
     * @param {Object} state - The state object.
     * @returns {Object} - The current location.
     */
    getCurrentLocation: (state) => {
      return state.currentLocation;
    },

    /**
     * Gets the current page name.
     * @param {Object} state - The state object.
     * @returns {string|null} - The current page name.
     */
    getPageName: (state) => {
      return state.pageName;
    },

    /**
     * Gets the current filter item.
     * @param {Object} state - The state object.
     * @returns {string} - The current filter item.
    */
    getFilterItem: (state) => {
      return state.filterItem;
    },

    /**
     * Gets the current sorting term.
     * @param {Object} state - The state object.
     * @returns {string} - The current sorting term.
    */
    getSorting: (state) => {
      return state.sorting;
    },
  },

  /**
   * Configuration for persistence of the store state.
   *
   * This configuration enables persistence of the store's state using the specified storage strategy.
   * The `enabled` property determines whether state persistence is enabled, and the `strategies` array 
   * specifies the storage options and keys for persisting the state.
   *
   * @type {Object}
   * @property {boolean} enabled - Whether state persistence is enabled.
   * @property {Array} strategies - An array of strategies for persisting the state.
   * @property {Object} strategies[].key - The key under which the state is stored in the specified storage.
   * @property {Storage} strategies[].storage - The storage mechanism used for persisting the state (e.g., localStorage).
  */

  persist: {
    enabled: true,
    strategies: [
      { key: 'appStore', storage: localStorage },
    ],
  },
});
