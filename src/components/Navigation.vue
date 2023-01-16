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
  <section>
    <header>
      <router-link to="/">
        <img class="media" alt="logo" src="#"/>
        <div class="content">
          <h1 class="title">Business Incubator</h1>
          <p class="subtitle">
            Develop your ideas with other like-minded entrepreneurs
          </p>
        </div>
      </router-link>
    </header>
    <nav>
      <router-link to="/top-voted">Top Voted</router-link>
      <router-link to="/most-discussed">Most Discussed</router-link>
    </nav>

    <section id="user" v-if="user">
      <p>Hello {{ user.displayName }} 👋</p>
      <button @click="logout">Logout</button>
      <!--      <p>{{ username }}</p>-->
      <!--      <img src="#" alt="user">-->
    </section>
    <section id="user" v-else>
      <router-link to="/authenticate">Login</router-link>
    </section>
  </section>
</template>


<style scoped>
/*Layout*/
section {
  display: flex;
}

header {
  display: flex;
}

nav {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
}
</style>
