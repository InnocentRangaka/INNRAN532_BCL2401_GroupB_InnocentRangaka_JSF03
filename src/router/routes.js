import Home from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/product/:id',
      name: 'ProductDetailView',
      component: () => import('../views/ProductDetailView.vue'),
    },
    {
      path: '/products/category/:category',
      name: 'Products',
      component: () => import('../views/ProductsView.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: () => import('../views/WishlistView.vue'),
    },
    {
      path: '/auth/login',
      name: 'Login',
    //   component: () => import('../pages/auth/Login.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
];

export default routes;