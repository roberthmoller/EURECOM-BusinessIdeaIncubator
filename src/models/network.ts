import {computed, ref} from "vue";

export enum Network {
    Offline = 0,
    Online = 1,

}

/// For testing purposes
export const forceOffline = false;
export const networkOf = (status: boolean) => !forceOffline && status ? Network.Online : Network.Offline;

export const network = ref<Network>(Network.Online)
export const isOffline = computed(() => network?.value === Network.Offline );
export const isOnline = computed(() => network?.value === Network.Online);

