<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  // console.log('Email:', email.value)
  // console.log('Password:', password.value)
}
</script>

<template>
  <div class="container flex items-center mx-auto px-4 py-4 min-h-[44px]">
    <div class="mb-2 text-xs text-left flex items-start mr-auto">
      <a @click="goBack" class="cursor-pointer text-gray-500 hover:text-cyan-900 hover:underline">
        <span class="flex h-full items-center text-xs text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
          <span class="mb-[0.1rem]">Back</span>
        </span>
      </a>
    </div>
  </div>

  <div
    class="container mx-auto p-8 min-h-[600px] h-full max-h-screen w-full items-center justify-center m-auto flex flex-col"
  >
    <div class="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 m-auto">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="../../assets/online-shop.png" alt="SwiftCart Logo" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="bg-white rounded-lg shadow-md mt-10 p-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md p-2.5 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md p-2.5 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div class="flex items-center justify-between mt-10">
          <div class="block text-sm">
            <router-link
              to="/auth/forgot_password"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</router-link
            >
          </div>

          <p class="block text-center text-sm text-gray-700 leading-6">
            Not a member?
            <router-link
              to="/auth/signup"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >Sign up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
