<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, profilesRef } from "@/firebase";
import { useCurrentUser } from "vuefire";
import { getStorage, ref as bucket, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { NewProfile } from "@/models/profile";
import { isOffline, isOnline } from "@/models/network";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const router = useRouter();
const storage = getStorage();
const user = useCurrentUser();
const photo = ref(null);
const isUploading = ref(false);
const registerFormName = ref("");
const registerFormEmail = ref("");
const registerFormPassword = ref("");
const errorMessage = ref("");
const isRegisterFormValid = computed(() => {
  return (
    registerFormName.value.length > 0 &&
    registerFormEmail.value.length > 0 &&
    registerFormPassword.value.length > 0
  );
});

const email = ref("");
const password = ref("");
const isLoginFormValid = computed(() => {
  return email.value.length > 0 && password.value.length > 0;
});
const login = async () => {
  if (!isLoginFormValid.value) {
    errorMessage.value = "";
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await router.push("/");
  } catch (error) {
    errorMessage.value =
      "Authentication failed. Please check you entered the correct username and/or password.";
  }
};

const register = async () => {
  if (!isRegisterFormValid.value) {
    return;
  }
  const credential = await createUserWithEmailAndPassword(
    auth,
    registerFormEmail.value,
    registerFormPassword.value
  );

  const attachment = photo.value;
  if (attachment) {
    isUploading.value = true;
    await new Promise((resolve) => {
      const reader = new FileReader();
      console.log("starting read");
      reader.readAsArrayBuffer(attachment);
      reader.onload = async (event) => {
        console.log("finished read");
        const filename = "profiles/" + credential.user.uid;
        const fileRe = bucket(storage, filename);
        console.log("starting upload");
        await uploadBytes(fileRe, event.target.result, {
          contentType: attachment.type,
          customMetadata: { owner: credential.user.uid },
        });
        console.log("finished upload");
        resolve();
      };
    });
    isUploading.value = false;
  }
  await setDoc(
    doc(profilesRef, credential.user.uid),
    new NewProfile(registerFormName.value, registerFormEmail.value)
  );
  await updateProfile(credential.user, { displayName: registerFormName.value });
  await router.push("/");
};

const logout = async () => {
  await signOut(auth);
  await router.push("/");
};
const onPhotoChange = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    photo.value = files[0];
  } else {
    photo.value = null;
  }
};
</script>

<template>
  <main class="container">
    <section id="authenticate" v-if="!user && isOnline" class="grid">
      <article>
        <form @submit.prevent>
          <h1>Login</h1>
          <label for="email">Email*</label>
          <input type="email" id="email" v-model="email" required />
          <label for="password">Password*</label>
          <input type="password" id="password" v-model="password" required />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button type="submit" @click="login" :disabled="!isLoginFormValid">
            Login
          </button>
        </form>
      </article>

      <article>
        <form @submit.prevent>
          <h1>Register</h1>
          <label for="photo">Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            @change="onPhotoChange"
          />
          <label for="name">Name*</label>
          <input type="name" id="name" v-model="registerFormName" required />
          <label for="email">Email*</label>
          <input type="email" id="email" v-model="registerFormEmail" required />
          <label for="password">Password*</label>
          <input
            type="password"
            id="password"
            v-model="registerFormPassword"
            required
          />
          <button @click="register" :disabled="!isRegisterFormValid">
            Register
          </button>
        </form>
      </article>
    </section>
    <section v-else-if="isOffline" id="offline">
      <article
        style="display: flex; justify-content: center; align-items: center"
      >
        <FontAwesomeIcon icon="fa-solid fa-chain-slash" size="3x" />
        <hgroup>
          <h1>Offline</h1>
          <p>Please connect to the internet to authenticate</p>
        </hgroup>
      </article>
    </section>
    <section v-else>
      <h1>Already authenticated</h1>
      <button @click="logout">Logout</button>
    </section>
  </main>

  <dialog :open="isUploading ? 'open' : null">
    <h1 aria-busy="true">Uploading..</h1>
  </dialog>
</template>

<style scoped>
.error-message {
  color: red;
}
#offline {
  display: flex;
  justify-content: center;
  align-items: center;
}

#offline article {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

#offline article hgroup,
#offline article hgroup * {
  margin: 0;
}

@media (min-width: 1024px) {
  #authenticate {
    display: flex;
  }

  #authenticate article {
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 1;
  }
}

@media (max-width: 1024px) {
  #authenticate {
    display: flex;
    flex-direction: column;
  }
}
</style>
