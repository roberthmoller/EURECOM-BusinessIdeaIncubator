<script setup>
import FirebaseResourceLinkContent from "@/components/firebase-storage/firebase-resource-link-content.vue";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <Suspense>
    <FirebaseResourceLinkContent :href="props.href">
      <slot></slot>
      <template v-slot:error>
        <slot name="error"></slot>
      </template>
    </FirebaseResourceLinkContent>
    <template #fallback>
      <a href="#" aria-busy="true">Loading...</a>
    </template>
  </Suspense>
</template>

<style scoped>
</style>
