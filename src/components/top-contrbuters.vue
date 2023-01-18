<script setup>
import {top10VotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";
import ProfileName from "@/components/profile-name.vue";


const topVotedIdeas = useCollection(top10VotedIdeasRef);
</script>

<template>
  <section id="top-contributers">
    <h1>Top Contributors 🏆</h1>
    <ol>
      <li v-for="idea in topVotedIdeas">
        <ProfileName :uid="idea.author" :key="idea.author"/>
      </li>
    </ol>
  </section>
</template>


<style scoped>

</style>
