<script setup>
import {mostDiscussedIdeasRef, topVotedIdeasRef} from "@/firebase";
import {useCollection} from "vuefire";

const topVotedIdeas = useCollection(topVotedIdeasRef);
const mostDiscussedIdeas = useCollection(mostDiscussedIdeasRef);

</script>
<template>
  <section>
    <h1>Top Voted Ideas <span>- <router-link to="/top-voted">see more</router-link></span></h1>
    <h3 v-for="idea in topVotedIdeas" :key="idea.id">
      {{ idea.title }} - {{ idea.description }}
      <br/>
      👍 {{ idea.voteCount }}
      <br/>
      💬 {{ idea.commentCount }}
    </h3>
  </section>
  <section>
    <h1>Most Discussed Ideas <span>- <router-link to="/most-discussed">see more</router-link></span></h1>
    <h3 v-for="idea in mostDiscussedIdeas" :key="idea.id">
      {{ idea.title }} - {{ idea.description }}
      <br/>
      👍 {{ idea.voteCount }}
      <br/>
      💬 {{ idea.commentCount }}
    </h3>
  </section>
</template>


<style scoped>

</style>
