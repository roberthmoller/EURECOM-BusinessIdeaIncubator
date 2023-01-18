<script setup>
import {top10VotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";
import IdeaCard from "@/components/idea-card.vue";

const topVotedIdeas = useCollection(top10VotedIdeasRef);
</script>

<template>
  <section id="top-voted">
    <hgroup>
      <h1>Top Voted 👍</h1>
      <router-link to="/top-voted">
        See all what others are voting for
      </router-link>
    </hgroup>
    <IdeaCard v-for="(idea, index) in topVotedIdeas" :idea="idea" :index="index"/>
  </section>
</template>


<style scoped>

</style>
