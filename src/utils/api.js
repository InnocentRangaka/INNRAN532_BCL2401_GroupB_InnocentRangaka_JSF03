<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')

// or
// re-fetch when props.id changes
const { data, error } = useFetch(() => `/posts/${props.id}`)
</script>