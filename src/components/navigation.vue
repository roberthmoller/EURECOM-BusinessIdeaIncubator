<script setup>
import {useCurrentUser, useFirebaseAuth} from "vuefire";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ProfileName from "@/components/profile-name.vue";
import ProfilePhoto from "@/components/profile-photo.vue";
import {isOffline, isOnline} from "@/models/network";

const user = useCurrentUser()
const router = useRouter()
const expanded = ref(false);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
}

const logout = async () => {
  await useFirebaseAuth().signOut();
  await router.push("/");
}
const routes = [
  {name: "All", path: "/all"},
  {name: "Top Voted", path: "/top-voted"},
  {name: "Most Discussed", path: "/most-discussed"},
]

const online = ref(true);
</script>

<template>
  <nav class="container-fluid">
    <ul class="links">
      <li class="collapsed">
        <details role="list">
          <summary aria-haspopup="listbox" role="link">
            <FontAwesomeIcon icon="fa-solid fa-bars"/>
          </summary>
          <ul role="listbox">
            <li v-for="route in routes" :key="route.path">
              <router-link :to="route.path" class="secondary">{{ route.name }}</router-link>
            </li>
          </ul>
        </details>
      </li>
      <li id="brand">
        <router-link to="/">
          <strong>Business Idea Incubator</strong>
        </router-link>
      </li>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path" class="secondary">{{ route.name }}</router-link>
      </li>
    </ul>
    <ul id="user">
      <li v-if="isOffline" class="status" data-tooltip="offline" data-placement="bottom">
        <FontAwesomeIcon icon="fa-solid fa-link-slash"/>
      </li>
      <li v-if="user">
        <details role="list" dir="rtl">
          <summary aria-haspopup="listbox" role="link">
            <ProfileName :uid="user.uid" class="name"/>
            <ProfilePhoto :uid="user.uid" :name="user.displayName" class="photo"/>
          </summary>
          <ul role="listbox">
            <li><router-link :to="'/profile/' + user.uid">Profile</router-link></li>
            <li><a @click="logout">Logout</a></li>
          </ul>
        </details>
      </li>
      <li v-else-if="isOnline">
        <router-link class="secondary" to="/authenticate">Login</router-link>
      </li>
    </ul>
  </nav>
</template>


<style scoped>
.status {
  border-bottom: none;
  color: darkred;
  margin: 0;
}

summary {
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: end;
}

summary .photo {
  text-align: center;
  margin-left: .5rem;
  height: 32px;
  width: 32px;
  border-radius: 100px;
  object-fit: cover;
}

summary p.photo {
  margin: 0;
  padding: 1rem 1rem;
  text-align: center;
  background: var(--card-sectionning-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

#brand {
  text-align: center;
}

.collapsed summary * {
  margin: .5rem;
}

.collapsed summary::after {
  display: none;
}

@media (min-width: 1024px) {
  .collapsed {
    display: none;
  }
}

@media (max-width: 1024px) {
  .links > li:not(.collapsed):not(#brand) {
    display: none;
  }

  #user summary .name {
    display: none;
  }
}
</style>
