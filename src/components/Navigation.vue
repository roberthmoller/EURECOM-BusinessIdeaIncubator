<script setup>
import {useCurrentUser, useFirebaseAuth} from "vuefire";
import {useRouter} from "vue-router";

const user = useCurrentUser()
const router = useRouter()
const logout = async () => {
  await useFirebaseAuth().signOut();
  await router.push("/authenticate");
}

</script>
<template>
  <nav class="container-fluid">
    <ul id="navigation">
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
        <p>👋{{ user.displayName }}</p>
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
}

#brand a hgroup {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
}

#user p {
  margin: 0 1rem;
  /*width: 15rem;*/
}
</style>
