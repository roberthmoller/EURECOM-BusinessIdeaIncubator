<script setup>
import {profilesRef} from "@/firebase";
import {useDocument} from "vuefire";
import {doc} from 'firebase/firestore'
import {isOnline} from "@/models/network";

const props = defineProps({
  uid: {
    type: String,
    required: true
  }
});

const authorRef = doc(profilesRef, props.uid);
const profile = useDocument(authorRef);
</script>

<template>
  <span v-if="profile">@{{ profile.name }}</span>
  <span v-else>@{{ props.uid }} <span :aria-busy="isOnline"></span></span>
</template>
