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
      <p>The hottest discussions right now
        <span>- <router-link to="/most-discussed">see more</router-link></span>
      </p>
    </hgroup>
    <IdeaCard v-for="(idea, index) in mostDiscussedIdeas" :idea="idea" :is-top="index === 0"/>
  </section>
</template>


<style scoped>

</style>
