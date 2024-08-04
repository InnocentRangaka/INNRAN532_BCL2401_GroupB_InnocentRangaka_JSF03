<script></script>

<template>
  <div class="h-full flex justify-center items-center bg-opacity-70">
    <div
      class="container bg-white rounded-lg p-4 w-full mt-6 sm:mt-8 lg:flex lg:items-start border border-gray-200 dark:border-gray-700"
    >
      <div
        role="status"
        class="bg-white w-full min-h-[74svh] h-full p-4 rounded-lg shadow animate-pulse"
      >
        <!-- Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[69svh] h-full">
          <!-- Image Placeholder -->
          <div
            class="flex items-center justify-center min-h-96 h-full bg-gray-300 rounded dark:bg-gray-700"
          >
            <svg
              class="min-w-10 max-w-[47%] min-h-10 max-h-[47%] text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path
                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
              />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>

          <!-- Product Info Placeholder -->
          <div class="grid">
            <!-- Title Placeholder -->
            <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-9 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mb-5 mt-auto"></div>

            <!-- Rating Placeholder -->
            <div class="h-4 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-auto"></div>

            <!-- Category Placeholder -->
            <div class="h-3 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2 mt-auto"></div>

            <!-- Price Placeholder -->
            <div
              class="h-7 w-1/2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-5 mt-auto"
            ></div>

            <!-- Button Placeholder -->
            <div class="h-11 w-1/2 bg-gray-200 rounded-lg dark:bg-gray-700 mb-5 mt-auto"></div>

            <!-- Description Placeholder -->
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-auto"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-auto"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-auto"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5 mt-auto"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-auto"></div>
          </div>
        </div>

        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
