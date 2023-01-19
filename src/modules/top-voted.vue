<script setup>
import {top10VotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";
import IdeaCard from "@/components/idea-card.vue";

const ideas = useCollection(top10VotedIdeasRef);

</script>

<template>
  <section class="container">
    <h1>Top Voted</h1>
    <main>
      <IdeaCard v-for="idea in ideas" :idea="idea" :key="idea.id"/>
    </main>
  </section>
</template>

<style scoped>

</style>
