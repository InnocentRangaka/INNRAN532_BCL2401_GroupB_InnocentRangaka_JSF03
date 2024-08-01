// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {

  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}