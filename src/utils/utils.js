/**
 * Calculate the total number of items in the cart.
 * @param {Object} cartItems - The items in the cart.
 * @returns {number} The total number of items.
 */
function calculateCartTotalItems(cartItems) {
    return Object.values(cartItems).length;
}

/**
 * Calculate the subtotal amount for the given items.
 * @param {Object} items - The items in the cart.
 * @returns {string} The subtotal amount formatted to two decimal places.
 */
export const calculateSubTotalAmount = (items) => {
    let total = 0;
    if (items) {
        total = Object.values(items).reduce((amount, item) => amount + (item.price * item.quantity), 0);
    }
    return parseFloat(total).toFixed(2);
};

/**
 * Calculate the total amount for the cart including tax and shipping.
 * @param {Object} items - The items in the cart.
 * @returns {string} The total amount formatted to two decimal places.
 */
export const calculateCartTotal = (items, stateTaxRate, stateShippingRate) => {
    const subTotal = parseFloat(calculateSubTotalAmount(items));
    const tax = (subTotal * stateTaxRate) / 100;
    const shipping = stateShippingRate;
    return (subTotal + tax + shipping).toFixed(2);
};

/**
 * Calculate the amount for a single item.
 * @param {Object} item - The item to calculate the amount for.
 * @returns {string} The amount for the item formatted to two decimal places.
 */
function calculateAmount(item) {
    return (item.price * item.quantity).toFixed(2);
}

/**
 * Calculate the total amount for the cart including tax and shipping.
 * @param {Object} cart - The cart object containing items and shipping rate.
 * @returns {string} The total cart amount formatted to two decimal places.
 */
function calculateTotalCartAmount(cart, stateTaxRate) {
    const subTotal = calculateSubTotalAmount(cart.cartItems);
    const shipping = parseFloat(cart.shippingRate);
    const tax = parseFloat(calculateTaxAmount(cart, stateTaxRate));
    return (subTotal + shipping + tax).toFixed(2);
}

/**
 * Calculate the tax amount for the given items.
 * @param {Object} items - The items in the cart.
 * @returns {string} The tax amount formatted to two decimal places.
 */
export function calculateTaxAmount(items, stateTaxRate) {
    const subTotal = calculateSubTotalAmount(items);
    const tax = (subTotal * stateTaxRate) / 100;
    return tax.toFixed(2);
}

/**
 * Create a copy of the cart items with the specified product and quantity updated.
 * @param {Object} cartItems - The current cart items.
 * @param {string} productId - The ID of the product to update.
 * @param {number} quantity - The quantity to add or update.
 * @returns {Object} The new cart items object.
 */
function getNewCartItems(cartItems, productId, quantity) {
    const newCartItems = { ...cartItems }; // Spread operator for a copy

    if (newCartItems[productId]) {
        newCartItems[productId].quantity += quantity;
    } else {
        newCartItems[productId] = { quantity };
    }

    return newCartItems;
}

/**
 * Create a unique array, removing duplicates and empty values.
 * @param {Array} array - The array to process.
 * @returns {Array} The unique array.
 */
export const createUniqueArray = (array) => {
    return Object.values(array).filter((item, index, self) => self.indexOf(item) === index); // Remove duplicates
}

/**
 * Filter an array of objects to contain only unique objects by a specified key.
 * @param {Array<Object>} array - The array of objects.
 * @param {string} key - The key to check for uniqueness.
 * @returns {Array<Object>} The array of unique objects.
 */
export function uniqueObjects(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

/**
 * Parse an object or JSON string into an array.
 * @param {Object|string} object - The object or JSON string to parse.
 * @returns {Object} The parsed object.
 */
export function parseObjectToArray(object) {
    let parsedObject = {};
    try {
        parsedObject = { ...JSON.parse(object) };
    } catch (error) {
        parsedObject = { ...object };
    }
    return parsedObject;
}