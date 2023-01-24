<script setup>
import {top3VotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";
import IdeaCard from "@/components/idea-card.vue";

const topVotedIdeas = useCollection(top3VotedIdeasRef);
</script>

<template>
  <section id="top-voted">
    <hgroup>
      <h1>Top Voted 👍</h1>
      <router-link to="/top-voted">
        See all what others are voting for
      </router-link>
    </hgroup>
    <IdeaCard v-for="(idea, index) in topVotedIdeas" :idea="idea" :index="index" :key="idea.id"/>
  </section>
</template>


<style scoped>

</style>
