<script setup>
import FirebaseImageCard from "@/components/firebase-image-card.vue";
import ProfileName from "@/components/profile-name.vue";
import AddComment from "@/components/add-comment.vue";
import Comment from "@/components/comment.vue";
import {useRouter} from "vue-router";
import {ideasRef} from "@/firebase";
import {useCollection, useCurrentUser, useDocument} from "vuefire";
import {collection, doc, limit, orderBy, query, setDoc} from 'firebase/firestore'
import {commentConverter} from "@/models/comment";
import {NewVote, voteConverter} from "@/models/vote";
import {isOffline, isOnline} from "@/models/network";

const router = useRouter();
const user = useCurrentUser();

// todo: make sure id is only one segment long "xyz", not "xyz/abc"
const ideaId = router.currentRoute.value.params.id;
const ideaRef = doc(ideasRef, ideaId);
const voteRef = doc(ideasRef, ideaId, "votes", user.value.uid)
    .withConverter(voteConverter);
const commentsRef = query(
    collection(ideasRef, ideaId, "comments"),
    orderBy("createdAt", "desc"),
    limit(10))
    .withConverter(commentConverter);

const idea = useDocument(ideaRef);
const vote = useDocument(voteRef);
const comments = useCollection(commentsRef);
const editIdea = () => {
  // router.push(`/ideas/${ideaId}/edit`);
  console.log("editIdea");
}

const upvoteIdea = async upvote => {
  console.log("upvoteIdea");
  const vote = new NewVote(upvote, user.value.uid);
  await setDoc(voteRef, vote);
}

const deleteIdea = () => {
  console.log("deleteIdea");
}
</script>

<template>
  <div v-if="idea" class="container">
    <article id="idea">
      <header>
        <hgroup id="title">
          <h1>{{ idea.title }}</h1>
          <div id="context">
            <a :href="'/profile/' + idea.author">
              <ProfileName :uid="idea.author"/>
            </a>
            <div id="actions">
              <a
                  :class="vote?.upvote ? 'secondary' :'primary'"
                  :data-tooltip="vote?.upvote ? 'remove vote': 'upvote'"
                  href="#"
                  role="button"
                  :disabled="isOffline"
                  @click="upvoteIdea(!vote?.upvote ?? true)">👍</a>
              <!-- Todo: Enable editing -->
              <a v-if="idea.author === user?.uid"
                 data-tooltip="edit" href="#" role="button"
                 :disabled="true"
                 @click="editIdea">📝</a>
              <a v-if="idea.author === user?.uid"
                 data-tooltip="delete" href="#" role="button"
                 :disabled="isOffline"
                 @click="deleteIdea">🗑️</a>
            </div>
          </div>
        </hgroup>
      </header>
      <main>
        <div v-md>{{ idea.description }}</div>
      </main>

      <footer id="attachments" v-if="idea.attachments.length > 0">
        <hgroup>
          <h5>Attachments</h5>
          <Suspense v-if="isOnline">
            <section id="attachment-list">
              <FirebaseImageCard v-for="attachment in idea.attachments" :attachment="attachment" :ideaId="ideaId"/>
            </section>

            <template #fallback>
              <p aria-busy="true">Loading...</p>
            </template>
          </Suspense>
          <p v-else>Not available offline..</p>
        </hgroup>
      </footer>
    </article>
    <hr>
    <section id="comments">
      <AddComment v-if="user" :idea-id="ideaId"/>
      <h5>Comments</h5>
      <section id="existing-comments">
        <Comment v-for="comment in comments" :idea="idea" :comment="comment"/>
      </section>

    </section>
  </div>
  <main v-else class="container">
    <h2>
      We could not find the idea you were looking for.
      Try
      <router-link to="/">going back to the home page</router-link>
      .
    </h2>
  </main>
</template>


<style scoped>

#title #context {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 1rem;
}

#attachments section {
  margin-bottom: 0;
}

#title #context p {
  margin: 0;
}

#title #context #actions {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  gap: 1rem;
}

#title #context [role="button"] {
  padding: 4px 10px;
}

header {
  padding: 1rem 2rem;
}


header hgroup {
  margin: 0;
}

#attachment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
