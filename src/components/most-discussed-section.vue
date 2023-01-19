<script setup>
import {tenMostDiscussedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";
import IdeaCard from "@/components/idea-card.vue";

const mostDiscussedIdeas = useCollection(tenMostDiscussedIdeasRef);

</script>

<template>
  <section id="most-discussed">
    <hgroup>
      <h1>Most Discussed 💬</h1>
      <router-link to="/most-discussed">
        See all the hottest discussions right now
      </router-link>
    </hgroup>
    <IdeaCard v-for="(idea, index) in mostDiscussedIdeas" :idea="idea" :index="index" :key="idea.id"/>
  </section>
</template>


<style scoped>

</style>
