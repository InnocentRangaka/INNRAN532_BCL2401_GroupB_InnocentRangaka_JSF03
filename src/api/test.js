async fetchCategories() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      this.categories = response.data;
      console.log(response.data)
    } catch (error) {
      this.error = error;
    }
  },
  async fetchSingleProduct(id) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return { response: response.data, error: null };
    } catch (error) {
      return { error: error, response: null };
    }
  },
  async fetchProducts() {
    this.loading = true;
    try {
      const url = this.filterItem !== 'All categories' 
        ? `https://fakestoreapi.com/products/category/${this.filterItem}`
        : 'https://fakestoreapi.com/products';

      const response = await axios.get(url);
      this.products = response.data;
      this.originalProducts = JSON.parse(JSON.stringify(response.data));
    } catch (error) {
      this.error = {
        status: error.response.status,
        message: 'Data fetching failed :( , please check your network connection and reload.',
        type: 'network/fetch',
      };
    } finally {
      this.sortProducts();
      this.searchProducts();
      setTimeout(() => {
        this.pageLoading = false;
      }, 1000);
      this.loading = false;
    }
  },