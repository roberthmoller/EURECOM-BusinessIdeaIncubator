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
      <p>See what others are voting for
        <span>- <router-link to="/top-voted">see more</router-link></span>
      </p>
    </hgroup>
    <IdeaCard v-for="(idea, index) in topVotedIdeas" :idea="idea" :is-top="index === 0"/>
  </section>
</template>


<style scoped>

</style>
