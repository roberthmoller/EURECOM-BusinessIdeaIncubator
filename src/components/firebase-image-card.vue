<script setup>
import {getDownloadURL, getMetadata, getStorage, ref as file} from "firebase/storage";
import {defineProps} from "vue";

const props = defineProps({
  ideaId: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
});

const storage = getStorage();

const fileRef = file(storage, `ideas/${props.ideaId}/${props.attachment}`);
const url = await getDownloadURL(fileRef);
const metadata = await getMetadata(fileRef);

</script>

<template>
  <a :href="url">
    <img v-if="metadata.contentType.startsWith('image')" :alt="props.attachment" :src="url" class="media">
    <span v-else class="media">📎</span>
    <div>
      <p>{{ props.attachment }}</p>
      <small>{{ metadata.contentType }}</small>
    </div>
  </a>

</template>

<style scoped>
a {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--accordion-border-color);
  padding: .5rem .7rem;
  border-radius: 3px;
  width: fit-content;
  text-decoration: none;
}

.media {
  height: 64px;
  width: 64px;
  text-align: center;
  font-size: 2.2rem;
  margin: auto .5rem auto auto;
}
img {
  border-radius: 3px;
  object-fit: cover;
}

p {
  margin: 0;
  color: white;
}

small {
  color: gray;
}
</style>
