<script setup>
import {useRouter} from "vue-router";
import {ideasRef, profilesRef} from "@/firebase";
import {useCollection, useDocument} from "vuefire";
import {doc, limit, orderBy, query, where} from "firebase/firestore";
import IdeaCard from "@/components/idea-card.vue";

const ideas = useCollection(ideasRef);

const router = useRouter();
const uid = router.currentRoute.value.params.uid;

const profileRef = doc(profilesRef, uid);
const ideasByUserRef = query(ideasRef,
    where('author', '==', uid),
    orderBy('createdAt', 'desc'),
    limit(10));

const user = useDocument(profileRef);
const ideasByUser = useCollection(ideasByUserRef);
</script>
<template>
  <section class="container">
    <header>
      <hgroup>
        <h1>@{{ user.name }}</h1>
        <p>user since
          <time v-date v-if="user">{{ user.createdAt }}</time>
        </p>
      </hgroup>
    </header>
    <main>
      <hgroup>
        <h3>Ideas</h3>
        <p>by {{ user.name }}</p>
      </hgroup>
      <IdeaCard v-for="idea in ideasByUser" :idea="idea"/>
    </main>
  </section>
</template>

<style scoped>

</style>
