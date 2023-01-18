import {createApp} from 'vue'
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './firebase'
import {router} from "./routes"
import {md} from "@/directives/md";
import {date} from "@/directives/date";
import App from './app.vue'
import './assets/main.css'
import '@picocss/pico'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

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
