<script setup>
import {topVotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";

const ideas = useCollection(topVotedIdeasRef);

</script>

<template>
  <h1>Top Voted Ideas</h1>
  <h3 v-for="idea in ideas" :key="idea.id">
    {{ idea.title }} - {{ idea.description }}
    <br/>
    👍 {{ idea.voteCount }}
    <br/>
    💬 {{ idea.commentCount }}
  </h3>
</template>

<style scoped>

</style>
