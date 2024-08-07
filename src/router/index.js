import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

/**
 * Creates and configures the Vue Router instance.
 *
 * This function sets up the router with HTML5 history mode and the application routes.
 *
 * @module router
 */

const router = createRouter({
  /**
   * Configures the router to use the HTML5 history mode.
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html|Vue Router History Mode}
   */
  history: createWebHistory(import.meta.env.BASE_URL),

  /**
   * The routes configuration for the application.
   *
   * @type {Array<Object>}
   * @see {@link https://router.vuejs.org/guide/#javascript|Vue Router Routes}
   */
  routes,
})

export default router
