<script setup>
import {ref} from "vue";
import {getStorage, ref as bucket, uploadBytes} from "firebase/storage";
import {addDoc} from "firebase/firestore";
import {ideasRef} from "@/firebase";
import {NewIdea} from "@/models/idea";
import {useCurrentUser} from "vuefire";


const user = useCurrentUser()
const storage = getStorage();
const title = ref();
const description = ref();
const attachments = ref([]);

const onFilesChanged = async (event) => {
  attachments.value = event.target.files;
}

const createIdea = async () => {
  let attachmentNames = [];
  for (let i = 0; i < attachments.value.length; i++) {
    const attachment = attachments.value[i];
    attachmentNames.push(attachment.name);
  }

  const reference = await addDoc(ideasRef, new NewIdea(title.value, description.value, user.value.uid, attachmentNames));
  for (const attachment of attachments.value) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(attachment);
    reader.onload = async (event) => {
      const filename = `ideas/${reference.id}/${attachment.name}`;
      const fileRe = bucket(storage, filename);
      await uploadBytes(fileRe, event.target.result, {contentType: attachment.type, customMetadata: {owner: user.value.uid}});
    }
  }

  title.value = "";
  description.value = "";
  attachments.value = [];
}
</script>

<template>
  <section id="new-idea">
    <hgroup>
      <h1>Share Idea</h1>
      <p>Contribute to the discussion and share your idea</p>
    </hgroup>
<!-- todo: validate form and wait for upload-->
    <label for="title">Title</label>
    <input type="text" id="title" v-model="title">
    <label for="description" ><span data-tooltip="Markdown syntax">Description</span></label>
    <textarea id="description" v-model="description"></textarea>
    <label for="files">Files</label>
    <input id="files" accept="image/jpeg, image/png" multiple
           ref="attachments"
           type="file" @change="onFilesChanged">

    <button @click="createIdea">Share</button>
  </section>
</template>

<style scoped>

</style>
