<script setup>
import {useRouter} from "vue-router";
import {ideasRef, profilesRef} from "@/firebase";
import {useCollection, useDocument} from "vuefire";
import {doc, limit, orderBy, query, where} from "firebase/firestore";
import IdeaCard from "@/components/idea-card.vue";
import ProfilePhoto from "@/components/profile-photo.vue";

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
  <section class="container" v-if="user">
    <header>
      <ProfilePhoto :uid="user.id" :name="user.name" class="photo"/>
      <hgroup>
        <h1>@{{ user.name }}</h1>
        <p>user since
          <time v-date>{{ user.createdAt }}</time>
        </p>
      </hgroup>
    </header>
    <main v-if="ideasByUser.length > 0">
      <hgroup>
        <h3>Ideas</h3>
        <p>by {{ user.name }}</p>
      </hgroup>
      <IdeaCard v-for="idea in ideasByUser" :idea="idea" :key="idea.id"/>
    </main>
  </section>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

header hgroup,
header hgroup * {
  margin-bottom: 0;
}

.photo {
  margin-left: .5rem;
  height: 128px;
  width: 128px;
  border-radius: 100px;
  object-fit: cover;
}

p.photo {
  text-align: center;
  font-size: 42px;
  background: var(--card-sectionning-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
