<script setup>
import {SavedIdea} from "@/models/idea";
import {defineProps} from "vue";

const props = defineProps({
  idea: {
    type: SavedIdea,
    required: true
  }
});
console.log(props.idea);
</script>

<template>
  <article :key="idea.id">
    <hgroup>
      <h2>{{ idea.title }}</h2>
      <p>{{ idea.description }}</p>
    </hgroup>
    <footer>
      👍 {{ idea.voteCount }} 💬 {{ idea.commentCount }}
    </footer>
  </article>
</template>

<style scoped>

</style>
