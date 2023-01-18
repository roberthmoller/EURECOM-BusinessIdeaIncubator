<script setup>
import {computed, ref} from "vue";
import {getStorage, ref as bucket, uploadBytes} from "firebase/storage";
import {addDoc} from "firebase/firestore";
import {ideasRef} from "@/firebase";
import {NewIdea} from "@/models/idea";
import {useCurrentUser} from "vuefire";


const user = useCurrentUser()
const storage = getStorage();
const title = ref("");
const description = ref("");
const attachments = ref([]);
const isFormValid = computed(() => {
  return title.value.length > 0 && description.value.length > 0;
});
const onFilesChanged = async (event) => {
  attachments.value = event.target.files;
}

const createIdea = async () => {
  if (!title.value || !description.value) {
    return;
  }

  let attachmentNames = [];
  for (let i = 0; i < attachments.value.length; i++) {
    const attachment = attachments.value[i];
    attachmentNames.push(attachment.name);
  }

  const reference = await addDoc(ideasRef, new NewIdea(title.value, description.value, user.value.uid, attachmentNames));
  console.log("starting upload")
  const uploads = [];
  for (const attachment of attachments.value) {
    uploads.push(await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(attachment);
      reader.onload = async (event) => {
        const filename = `ideas/${reference.id}/${attachment.name}`;
        const fileRe = bucket(storage, filename);
        await uploadBytes(fileRe, event.target.result, {contentType: attachment.type, customMetadata: {owner: user.value.uid}});
        resolve();
      }
    }));
  }
  await Promise.all(uploads);
  console.log("finished upload")

  title.value = "";
  description.value = "";
  attachments.value = [];
}
</script>

<template>
  <section id="new-idea">
    <hgroup>
      <h1>Share Idea 💡</h1>
      <p>Contribute to the discussion and share your idea</p>
    </hgroup>
    <!-- todo: validate form and wait for upload-->
    <form @submit.prevent>
      <label for="title">Title*</label>
      <input type="text" id="title" v-model="title" required>
      <label for="description"><span data-tooltip="Markdown syntax">Description*</span></label>
      <textarea id="description" v-model="description" required></textarea>
      <label for="files">Files</label>
      <input id="files" accept="image/jpeg, image/png" multiple
             ref="attachments"
             type="file" @change="onFilesChanged">

      <button type="submit" @click="createIdea" :disabled="!isFormValid">Share</button>
    </form>
  </section>
</template>

<style scoped>

</style>