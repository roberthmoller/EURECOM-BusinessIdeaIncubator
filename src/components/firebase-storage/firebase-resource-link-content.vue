<script setup>
import {getDownloadURL, getStorage, ref as file} from "firebase/storage";
import {defineProps, ref} from "vue";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});


const storage = getStorage();
const error = ref(null);
const url = ref(null);

try {
  url.value = await getDownloadURL(file(storage, props.href));
} catch (e) {
  error.value = "not found";
}
</script>

<template>
  <a :href="url" v-if="url && !error">
    <slot></slot>
  </a>
  <span v-else-if="error">
    <slot name="error">{{ error }}</slot>
  </span>
</template>

<style scoped>
</style>
