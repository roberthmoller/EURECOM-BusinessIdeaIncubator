<script setup>
import {SavedIdea} from "@/models/idea";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useCurrentUser, useDocument} from "vuefire";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {NewVote, voteConverter} from "@/models/vote";
import {ideasRef} from "@/firebase";
import ProfileName from "@/components/profile-name.vue";
import {isOffline, isOnline} from "@/models/network";

const props = defineProps({
  idea: {
    type: SavedIdea,
    required: true,
  },
  index: {
    type: Number,
    default: -1,
  },
});
const router = useRouter();
const user = useCurrentUser();
const isAuthenticated = computed(() => user.value !== null);

const voteRef = user.value
    ? doc(ideasRef, props.idea.id, "votes", user.value.uid).withConverter(
        voteConverter
    )
    : null;
const vote = user.value ? useDocument(voteRef) : null;

const podium = ["🥇", "🥈", "🥉"];
const upvoteIdea = async (v) => {
  if (user) {
    if (v) {
      await deleteDoc(voteRef);
    } else {
      const newVote = new NewVote(true, user.value.uid);
      await setDoc(voteRef, newVote);
    }
  }
};

const goToIdea = () => {
  router.push(`/idea/${props.idea.id}`);
};

const deleteIdea = async () => {
  if (window.confirm("Are you sure you want to delete this idea?")) {
    await deleteDoc(ideasRef.doc(props.idea.id));
  }
};
let onProfilePage = false;

const checkProfilePage = async () => {
  if (window.location.href.includes("/profile/")) {
    onProfilePage = true;
  } else {
    onProfilePage = false;
  }
};

checkProfilePage();

const onProfilePageCheck = computed(() => onProfilePage);
</script>

<template>
  <article :key="idea.id" @click="goToIdea">
    <hgroup>
      <h2>
        {{ idea.title }}
        {{ 0 <= props.index < podium.length ? podium[props.index] : "" }}
      </h2>
      <div class="context">
        <p>
          <router-link :to="'/profile/' + idea.author">
            <ProfileName :uid="idea.author"/>
          </router-link>
        </p>

        <div class="actions">
          <span
              v-if="isOnline"
              :class="user && vote?.upvote ? 'secondary' : 'primary'"
              :data-tooltip="
              isOnline
                ? vote?.upvote
                  ? 'remove vote'
                  : 'upvote'
                : 'connect to upvote'
            "
              href="#"
              :role="isAuthenticated ? 'button' : ''"
              :disabled="isOffline ? true : null"
              @click.stop="upvoteIdea(vote)"
          >
            <span>{{ idea.voteCount }}</span>
            <span>👍</span>
          </span>

          <a
              href="#"
              role="button"
              data-tooltip="comment"
              :disabled="isOffline ? true : null"
              @click="goToIdea">
            <span>{{ idea.commentCount }}</span>
            <span>💬</span>
          </a>

          <span
              href="#"
              v-if="onProfilePageCheck"
              @click.stop="deleteIdea"
              role="button"
              class="delete"
              :disabled="isOffline ? true : null"
              data-tooltip="delete">
            <span>🗑️</span>
          </span>
        </div>
      </div>
    </hgroup>
  </article>
</template>

<style scoped>
article:hover {
  cursor: pointer;
}

.delete {
  background-color: red;
  border-color: darkred;
}

.actions > * {
  text-decoration: none;
  border-bottom: none !important;

  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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

.context h2,
p {
  margin: 0;
  padding: 0;
}

/*.context .actions > span,*/
.context [role="button"] {
  padding: 4px 10px;
}
</style>
