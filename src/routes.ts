import {createRouter, createWebHistory} from 'vue-router';
import {getCurrentUser} from "vuefire";
import Authenticate from "@/modules/authenticate.vue";
import Home from "@/modules/home.vue";
import Idea from "@/modules/idea.vue";
import AllIdeas from "@/modules/all-ideas.vue";
import TopVoted from "@/modules/top-voted.vue";
import MostDiscussed from "@/modules/most-discussed.vue";
import Profile from "@/modules/profile.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/all', component: AllIdeas},
        {path: '/top-voted', component: TopVoted},
        {path: '/most-discussed', component: MostDiscussed},
        {path: '/profile/:uid', component: Profile, meta: {requiresAuth: true}},
        {path: '/authenticate', component: Authenticate},
        {path: '/idea/:id', component: Idea, meta: {requiresAuth: true}},
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

