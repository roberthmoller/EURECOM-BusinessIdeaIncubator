<script setup>
import {ideasRef, mostDiscussedIdeasRef, topVotedIdeasRef} from "@/firebase";
import {useCollection, useCurrentUser} from "vuefire";
import {addDoc} from "firebase/firestore";
import IdeaCard from "@/components/idea-card.vue";
import {ref} from "vue";
import {NewIdea} from "@/models/idea";

const topVotedIdeas = useCollection(topVotedIdeasRef);
const mostDiscussedIdeas = useCollection(mostDiscussedIdeasRef);

const user = useCurrentUser()
const title = ref();
const description = ref();
const createIdea = async () => {
  await addDoc(ideasRef, new NewIdea(title.value, description.value));
  title.value = "";
  description.value = "";
}

</script>
<template>
  <div class="container-fluid layout">
    <main class="container">
      <section id="top-voted">
        <hgroup>
          <h1>Top Voted Ideas</h1>
          <span><router-link to="/top-voted">See more</router-link></span>
        </hgroup>
        <IdeaCard v-for="idea in topVotedIdeas" :idea="idea"/>
      </section>
      <section id="most-discussed">
        <h1>Most Discussed Ideas <span>- <router-link to="/most-discussed">see more</router-link></span></h1>
        <IdeaCard v-for="idea in mostDiscussedIdeas" :idea="idea"/>
      </section>
    </main>
    <aside id="new-idea" v-if="user">
      <h1>New Idea</h1>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title">
      <!--Markdown-->
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
      <!--Files upload-->
      <label for="files">Files</label>
      <input id="files" multiple type="file">

      <button @click="createIdea">Create Idea</button>
    </aside>
  </div>
</template>


<style scoped>
@media (min-width: 1024px) {
  .layout {
    display: flex;
    flex-direction: row;
  }

  aside {
    min-width: 30vw;
    margin-left: 1rem;
  }
}

@media (max-width: 1024px) {
  .layout {
    display: flex;
    flex-direction: column;
  }
}


</style>
