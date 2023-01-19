<script setup>
import {useCurrentUser} from "vuefire";
import TopVotedSection from "@/components/top-voted-section.vue";
import MostDiscussedSection from "@/components/most-discussed-section.vue";
import ShareIdea from "@/components/share-idea.vue";

const user = useCurrentUser()

</script>
<template>
  <div class="container-fluid layout">
    <main class="container">
      <TopVotedSection/>
      <MostDiscussedSection/>
    </main>
    <aside v-if="user" class="container">
      <ShareIdea/>
<!--      <TopContrbuters/>-->
    </aside>
  </div>
</template>


<style scoped>
@media (min-width: 1024px) {
  .layout {
    display: flex;
    flex-direction: row;
  }

  aside {
    max-width: 30vw;
    margin-left: 1rem;
  }
}

@media (max-width: 1024px) {
  .layout {
    display: flex;
    flex-direction: column;
  }
}
</style>
