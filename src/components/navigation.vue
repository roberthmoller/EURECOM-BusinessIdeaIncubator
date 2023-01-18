<script setup>
import {useCurrentUser, useFirebaseAuth} from "vuefire";
import {useRouter} from "vue-router";

const user = useCurrentUser()
const router = useRouter()

const logout = async () => {
  await useFirebaseAuth().signOut();
  await router.push("/");
}

</script>
<template>
  <nav class="container-fluid">
    <ul id="navigation">
      <li>
        <router-link to="/all" class="secondary">All</router-link>
      </li>
      <li>
        <router-link to="/top-voted" class="secondary">Top Voted</router-link>
      </li>
      <li>
        <router-link to="/most-discussed" class="secondary">Most Discussed</router-link>
      </li>
    </ul>
    <ul id="brand">
      <li>
        <router-link to="/">
          <strong>Business Idea Incubator</strong>
        </router-link>
      </li>
    </ul>

    <ul id="user">
      <li v-if="user">
        <a :href="'/profile/' + user.uid"><!--👋-->{{ user.displayName }}</a>
        <button @click="logout">Logout</button>
      </li>
      <li v-else>
        <router-link class="secondary" to="/authenticate">Login</router-link>
      </li>
    </ul>
  </nav>
</template>


<style scoped>
#brand a, #user li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 1rem;
}

#user li a {
  flex-grow: 1;
}

#brand a hgroup {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
}

#user p {
  width: 15rem;
}

#user button {
  padding: .2rem 1rem;
}
</style>
