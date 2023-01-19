<script setup>
import {ideasRef} from "@/firebase";
import {useCollection} from "vuefire";
import IdeaCard from "@/components/idea-card.vue";

const ideas = useCollection(ideasRef);

</script>

<template>
  <section class="container">
    <h1>All Ideas</h1>
    <main>
      <IdeaCard v-for="idea in ideas" :idea="idea" :key="idea.id"/>
    </main>
  </section>
</template>

<style scoped>

</style>
