<script setup>
import {SavedIdea} from "@/models/idea";
import {defineProps} from "vue";
import {useRouter} from "vue-router";
import {useCurrentUser, useDocument} from "vuefire";
import {doc, setDoc} from 'firebase/firestore'
import {NewVote, voteConverter} from "@/models/vote";
import {ideasRef} from "@/firebase";
import ProfileName from "@/components/profile-name.vue";


const props = defineProps({
  idea: {
    type: SavedIdea,
    required: true
  },
  isTop: {
    type: Boolean,
    default: false
  }
});
const router = useRouter();
const user = useCurrentUser();

const voteRef = user.value ? doc(ideasRef, props.idea.id, "votes", user.value.uid)
    .withConverter(voteConverter) : null;
const vote = user.value ? useDocument(voteRef) : null;
const upvoteIdea = async v => {
  if (user) {
    const newVote = new NewVote(!v?.upvote ?? true, user.value.uid);
    await setDoc(voteRef, newVote);
  }
}


const goToIdea = () => {
  router.push(`/idea/${props.idea.id}`);
}
</script>

<template>
  <article :key="idea.id" @click="goToIdea">
    <hgroup>
      <div class="context">
        <h2>{{ idea.title }} {{ props.isTop ? "🔥" : "" }}</h2>
        <div class="actions">
          <a href="#" role="button" :data-tooltip="vote?.upvote ? 'remove vote': 'upvote'"
             @click.stop="upvoteIdea(vote)" :class="user && vote?.upvote ? 'secondary' :'primary'"
             :disabled="!user"
          >
            {{ idea.voteCount }} 👍
          </a>
          <a href="#" role="button" data-tooltip="comment" @click="goToIdea">{{ idea.commentCount }} 💬</a>
        </div>
      </div>
      <p>
        <a :href="'/profile/' + idea.author">
          <ProfileName :uid="idea.author"/>
        </a>
      </p>
    </hgroup>
  </article>
</template>

<style scoped>
article:hover {
  cursor: pointer;
}


article {
  padding: 1rem 2rem;
  margin: 1rem auto;
}

hgroup {
  margin: 0;
  padding: 0;
}

.context {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.context .actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 1rem;
}

.context h2, p {
  margin: 0;
  padding: 0;
}

.context [role="button"] {
  padding: 4px 10px;
}
</style>
