<script setup>
import FirebaseImageLink from "@/components/firebase-storage/firebase-resource-link.vue";
import {SavedComment} from "@/models/comment";
import {SavedIdea} from "@/models/idea";
import ProfileName from "@/components/profile-name.vue";

const props = defineProps({
  comment: {
    type: SavedComment,
    required: true
  },
  idea: {
    type: SavedIdea,
    required: true
  }
});
const resource = (attachment) => {
  return `ideas/${props.idea.id}/comments/${props.comment.id}/${attachment}`;
}
</script>

<template>
  <blockquote class="comment">
    <div class="text" v-md>{{ comment.text }}</div>
    <footer>
      <sub v-date>{{ comment.createdAt }}</sub>
      <br/>
      <router-link :to="'/profile/' + comment.author">
        <ProfileName :uid="comment.author"/>
      </router-link>
      <br/>
      <div class="comment-attachments" v-if="comment.attachments.length > 0">
        <FirebaseImageLink v-for="attachment in comment.attachments" :key="attachment"
                           :href="resource(attachment)">
          📎 {{ attachment }}
          <template v-slot:error>
            🚫 <s>{{ attachment }}</s>
          </template>
        </FirebaseImageLink>
      </div>
    </footer>
  </blockquote>
</template>

<style scoped>
.comment-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
