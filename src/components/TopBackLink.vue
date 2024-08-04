<script>
/**
 * Navigates the user to the previous page in the browser's history.
 * This function calls the `window.history.back()` method to move back one step in the browsing history.
 */
const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="container flex items-center mx-auto px-4 py-4 min-h-[44px]">
    <div class="mb-2 text-xs text-left flex items-start mr-auto">
      <button
        @click="
          {
            ;() => goBack()
          }
        "
        class="cursor-pointer hover:text-cyan-900 hover:underline"
      >
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
      </button>
    </div>
  </div>
</template>
