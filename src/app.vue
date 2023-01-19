<script lang="ts" setup>
import {workbox} from './rgisterServiceWorker'
import Navigation from "@/components/navigation.vue";
import {network, networkOf} from "@/models/network";
import {VOffline} from "v-offline";

workbox.addEventListener('waiting', () => {
  workbox.addEventListener('controlling', () => {
    window.location.reload();
  });
  workbox.messageSW({type: 'SKIP_WAITING'});
});

const onNetworkChange = (status: boolean) => {
  network.value = networkOf(status)
}

</script>

<template>
  <VOffline @detected-condition="onNetworkChange"></VOffline>
  <Navigation/>
  <router-view></router-view>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
