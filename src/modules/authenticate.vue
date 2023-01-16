<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "@/firebase";
import {useCurrentUser} from "vuefire";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const login = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value);
  await router.push("/");
}
const register = async () => {
  const credential = await createUserWithEmailAndPassword(auth, email.value, password.value);
  await updateProfile(credential.user, {displayName: name.value});
  await router.push("/");
}

const user = useCurrentUser()
</script>


<template>
  <section id="authenticate" v-if="!user">
    <article>

      <h1>Register</h1>
      <label for="name">Name</label>
      <input type="name" id="name" v-model="name">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">

      <button @click="register">Register</button>
    </article>
    <hr/>
    <article>
      <h1>Login</h1>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
      <button @click="login">Login</button>
    </article>
  </section>
  <section v-else>
    <h1>Already authenticated</h1>
    <button @click="logout">Logout</button>
  </section>
</template>


<style scoped>

</style>
