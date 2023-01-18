import {createApp} from 'vue'
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './firebase'
import {router} from "./routes"
import {md} from "@/directives/md";
import {date} from "@/directives/date";
import App from './app.vue'
import './assets/main.css'
import '@picocss/pico'

createApp(App)
    .use(router)
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
    .directive('md', md)
    .directive('date', date)
    .mount('#app')
