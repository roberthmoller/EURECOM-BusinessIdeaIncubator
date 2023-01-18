<script setup>
import {getDownloadURL, getStorage, ref as file} from 'firebase/storage'
import {defineProps, ref} from "vue";

const props = defineProps({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});
const storage = getStorage();
const src = ref(null);
const profileStorage = file(storage, '/profiles/'+ props.uid);

getDownloadURL(profileStorage).then(url => {
  src.value = url;
}).catch(error => {
  src.value = null;
});

</script>

<template>
  <img v-if="src" :src="src"/>
  <p v-else>{{ props.name?.charAt(0)}}</p>
</template>


<style scoped>

</style>
