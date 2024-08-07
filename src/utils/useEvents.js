import { onMounted, onUnmounted } from 'vue'

/**
 * Custom hook for adding and removing an event listener on a target element.
 *
 * This hook registers the event listener when the component is mounted and unregisters it when the component is unmounted.
 *
 * @param {EventTarget} target - The target element to which the event listener is added.
 * @param {string} event - The name of the event to listen for.
 * @param {Function} callback - The callback function to be executed when the event is triggered.
 */
export function useEventListener(target, event, callback) {

  /**
   * Registers the event listener when the component is mounted.
   */
  onMounted(() => target.addEventListener(event, callback))

  /**
   * Unregisters the event listener when the component is unmounted.
   */
  onUnmounted(() => target.removeEventListener(event, callback))
}
