# Vue.js E-Commerce Store

SwiftCart is an e-commerce web application built with Vue.js 3 and Pinia. It allows users to browse products in a grid layout, view detailed information about individual products, filter and sort products, and navigate seamlessly between product listings and detailed views. All shop data is dynamically loaded from an API.

## Table of Contents

- Features
- Technologies Used
- Setup Instructions
- User Stories
- Project Structure

## Features

- Display a grid of product cards
- Show product images, titles, prices, and categories
- Navigate to detailed product views
- Display detailed product information including title, description, image, price, category, rating, and number of reviews
- Fetch all shop data from an API
- Implement loading states while fetching data
- Filter products by category
- Sort products by lowest and highest price
- Maintain applied filters and sorting after navigating to a detailed view and returning to the home page
- Navigate back to the product grid/list page from a detailed product view

## Technologies Used

- Vue.js 3
- Pinia (state management)
- Pinia Plugin Persistedstate (persistant storage management)
- Vue Router (routing)
- Tailwind CSS (styling)
- Axios (HTTP client)
- JSONPlaceholder API (dummy API for demonstration purposes)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn (v1.22 or higher)

### Installation

1. Clone the repository:

   ```Bash
   git clone https://github.com/your-username/swiftcart.git
   cd swiftcart
   ```

2. Install dependencies:

   ```Bash
   npm install
   #or if you use yarn
   yarn install
   ```

3. Run the development server:

```Bash
   npm dev
   #or if you use yarn
   yarn dev
```

4. Build the project for production:

```Bash
   npm run build
   #or if you use yarn
   yarn build
```

## User Stories

- As a user, I see a grid of cards: The homepage displays a grid of product cards, each showing an image, title, price, and category.
- As a user, I see an image of the product when browsing: Each product card includes an image of the product.
- As a user, I see a title of the product when browsing: Each product card includes the product title.
- As a user, I see the price of the product when browsing: Each product card includes the product price.
- As a user, I see a category that the product belongs to when browsing: Each product card includes the product category.
- As a user, I am able to navigate to a detailed view of the product (navigation only): Clicking on a product card navigates to the detailed view page of the product.
- As a user, I can see the title of the product in the detailed product page: The detailed product page displays the product title.
- As a user, I can see the description of the product in the detailed product page: The detailed product page displays the product description.
- As a user, I can see an image of the product in the detailed product page: The detailed product page displays an image of the product.
- As a user, I can see the price of the product in the detailed product page: The detailed product page displays the product price.
- As a user, I can see the category of the product in the detailed product page: The detailed product page displays the product category.
- As a user, I can see the rating & number of reviews for the product in the detailed product page: The detailed product page displays the product rating and the number of reviews.
- As a user, I am able to go back to the products grid/list page from a detailed product view: There is a navigation option to go back to the product grid/list page.
- All shop data is loaded via a fetch call from the API (Note no shop data should be hardcoded in the application): All product data is fetched from an API.
- When viewing a specific product, data is loaded via fetch from the individual product endpoint: Detailed product data is fetched from a specific API endpoint.
- There is a loading state while initial data is being loaded: A loading state is shown while the initial data is being fetched.
- There is a loading state while new data is being loaded: A loading state is shown while new data is being fetched (e.g., when filtering or sorting).
- As a user, I am able to filter products by category (categories fetched from the API): Users can filter products by category.
- As a user, I am able to sort products by lowest & highest price (both required): Users can sort products by lowest and highest price.
- As a user, I am able to go back to default filtering and sorting without refreshing the app (both required): Users can reset filters and sorting to default without refreshing the app.
- As a user, I should still see my applied filters and sorting after navigating to a detailed view and returning to the home page (do not use local storage for this): Applied filters and sorting are maintained after navigating to and from the detailed product view without using localStorage.

## Project Structure

swiftcart/
├── public/
│ └── favicon.ico
├── src/
│ ├── api/
│ │ └── api.js
│ ├── assets/
│ │ └── styles/
│ │ | ├── styles.css
│ │ | ├── main.css
│ │ └── online-shop.png
│ ├── components/
│ │ ├── icons/
│ │ │ ├── CartIcon.vue
│ │ │ ├── HamburgerIcon.vue
│ │ │ ├── HeartIcon.vue
│ │ │ ├── RatingStars.vue
│ │ │ └── UserIcon.vue
│ │ ├── includes/
│ │ │ ├── MainFooter.vue
│ │ │ ├── MainLayout.vue
│ │ │ ├── HeartIcon.vue
│ │ │ ├── NoItemFound.vue
│ │ │ ├── MainLayout.vue
│ │ │ ├── SearchFilterSort.vue
│ │ │ ├── StickyHeader.vue
│ │ │ ├── SuccessToast.vue
│ │ │ └── TopBackLink.vue
│ │ ├── nav/
│ │ │ ├── CartNav.vue
│ │ │ └── WishListNav.vue
│ │ ├── products/
│ │ │ ├── ProductCards.vue
│ │ │ ├── ProductCardSkeleton.vue
│ │ │ ├── ProductDetails.vue
│ │ │ └── ProductDetailSkeleton.vue
│ ├── router/
│ │ ├── index.js
│ │ └── routes.js
│ ├── stores/
│ │ └── appStore.js
│ ├── utils/
│ │ ├── useEvents.js
│ │ ├── useFetch.js
│ │ └── utils.js
│ ├── views/
│ │ ├── auth/
│ │ │ └── LoginView.vue
│ │ ├── CartView.vue
│ │ ├── HomeView.vue
│ │ ├── NotFoundView.vue
│ │ ├── ProductDetailView.vue
│ │ ├── ProductsView.vue
│ │ └── WishlistView.vue
│ ├── App.vue
│ └── main.js
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc.json
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
