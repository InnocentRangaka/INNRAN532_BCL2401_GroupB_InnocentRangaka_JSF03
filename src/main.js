import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import axios from 'axios';

import App from './App.vue'
import router from './router'

/**
 * Main entry point for the Vue application.
 * 
 * This script sets up the Vue application by importing necessary modules and components,
 * creating the application instance, and mounting it to the DOM.
 *
 * @module main
 */

// Create the Vue application instance
const app = createApp(App)

/**
 * Set up Pinia for state management.
 * Pinia is a store library for Vue, providing a simpler and more intuitive API for state management.
 */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

/**
 * Set up the Vue Router for application routing.
 * Vue Router is the official router for Vue.js, enabling navigation between different components and views.
 */
app.use(router)

/**
 * Set up Axios for HTTP requests.
 * Axios is a promise-based HTTP client for the browser and Node.js, making it easier to make API calls.
 */
// app.use(axios)

/**
 * Mount the Vue application to the DOM element with the id 'app'.
 * This step makes the Vue application visible and interactive in the browser.
 */
app.mount('#app')
