<script setup>
import {computed, defineProps, ref} from "vue";
import {useCurrentUser} from "vuefire";
import {addDoc, collection} from 'firebase/firestore'
import {ideasRef} from "@/firebase";
import {getStorage, ref as file, uploadBytes} from "firebase/storage";
import {commentConverter, NewComment} from "@/models/comment";
import {isOffline, isOnline} from "@/models/network";

const props = defineProps({
  ideaId: {
    type: String,
    required: true
  }
});

const user = useCurrentUser();
const storage = getStorage();
const commentsRef = collection(ideasRef, props.ideaId, "comments").withConverter(commentConverter);

const comment = ref("");
const isUploading = ref(false);
const attachments = ref([]);
const isFormValid = computed(() => {
  return comment.value.length > 0;
});
const onFilesChanged = async (event) => {
  attachments.value = event.target.files;
}

const addComment = async () => {
  console.log("addComment");
  if (user.value && comment && comment.value) {
    try {

      const attachmentNames = [];
      for (let i = 0; i < attachments.value.length; i++) {
        const attachment = attachments.value[i];
        attachmentNames.push(attachment.name);
      }
      const newComment = new NewComment(comment.value, user.value.uid, attachmentNames)
      const commentRef = await addDoc(commentsRef, newComment);
      isUploading.value = true;

      const uploads = []
      for (const attachment of attachments.value) {
        uploads.push(new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(attachment);
          reader.onload = async (event) => {
            const filename = `ideas/${props.ideaId}/comments/${commentRef.id}/${attachment.name}`;
            console.log("filename", filename);

            const fileRef = file(storage, filename);
            await uploadBytes(fileRef, event.target.result,
                {contentType: attachment.type, customMetadata: {owner: user.value.uid}})

            resolve();
          }
        }));
        await Promise.all(uploads);
      }
    } catch (e) {
      console.error(e);
    }
    comment.value = "";
    attachments.value = [];
    isUploading.value = false;
  }
};
</script>

<template>
  <section id="new-comment">
    <h5>Add a <span data-tooltip="Markdown syntax">comment</span></h5>
    <form @submit.prevent>
      <textarea v-model="comment"
                :placeholder="isOnline ? 'What do you think?*': 'You need to be connected to the internet to comment'"
                required :readonly="isOffline"></textarea>
      <input id="new-comment-attachments" :ref="attachments" multiple
             accept="image/jpeg, image/png" type="file"
             :disabled="isOffline"
             v-on:change="onFilesChanged"/>
      <!-- todo: warn user from navigating away -->
      <button type="submit" @click="addComment" :disabled="!isFormValid" class="">Add comment</button>
    </form>
  </section>

  <dialog :open="isUploading ? 'open': null">
    <h1 aria-busy="true">Uploading..</h1>
  </dialog>
</template>

<style scoped>

</style>
