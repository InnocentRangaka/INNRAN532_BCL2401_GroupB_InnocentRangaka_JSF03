import Home from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue';

/**
 * The routes for the application.
 * @type {Array<Object>}
 */
const routes = [
    /**
     * Home page route.
     * @type {Object}
     * @property {string} path - The URL path.
     * @property {string} name - The route name.
     * @property {Object} component - The component to render.
     */
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    /**
     * Product detail page route.
     * @type {Object}
     * @property {string} path - The URL path with product ID parameter.
     * @property {string} name - The route name.
     * @property {Function} component - The component to render (lazy-loaded).
     */
    {
      path: '/product/:id',
      name: 'ProductDetailView',
      component: () => import('../views/ProductDetailView.vue'),
    },
    /**
     * Products by category page route.
     * @type {Object}
     * @property {string} path - The URL path with category parameter.
     * @property {string} name - The route name.
     * @property {Function} component - The component to render (lazy-loaded).
     * @property {boolean} props - Pass route params as props to the component.
     */
    {
      path: '/products/category/:category',
      name: 'Products',
      component: () => import('../views/ProductsView.vue'),
      props: true,
    },
    /**
     * Cart page route.
     * @type {Object}
     * @property {string} path - The URL path.
     * @property {string} name - The route name.
     * @property {Function} component - The component to render (lazy-loaded).
     */
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
    },
    /**
     * Wishlist page route.
     * @type {Object}
     * @property {string} path - The URL path.
     * @property {string} name - The route name.
     * @property {Function} component - The component to render (lazy-loaded).
     */
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: () => import('../views/WishlistView.vue'),
    },
    /**
     * Login page route.
     * @type {Object}
     * @property {string} path - The URL path.
     * @property {string} name - The route name.
     * @property {Function} component - The component to render (lazy-loaded).
     */
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    /**
     * Catch-all route for undefined paths (404 Not Found).
     * @type {Object}
     * @property {string} path - The catch-all path pattern.
     * @property {string} name - The route name.
     * @property {Object} component - The component to render.
     */
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
];

export default routes;
