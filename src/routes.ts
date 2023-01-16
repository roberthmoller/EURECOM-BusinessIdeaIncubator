import {createRouter, createWebHistory} from 'vue-router';
import {getCurrentUser} from "vuefire";
import Authenticate from "@/modules/authenticate.vue";
import Home from "@/modules/home.vue";
import TopVoted from "@/modules/top-voted.vue";
import MostDiscussed from "@/modules/most-discussed.vue";

export const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/top-voted', component: TopVoted},
        {path: '/most-discussed', component: MostDiscussed},
        {path: '/profile', component: Home, meta: {requiresAuth: true}},
        {path: '/authenticate', component: Authenticate},
    ],
})

router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return {
                path: '/authenticate',
            }
        }
    }
})

