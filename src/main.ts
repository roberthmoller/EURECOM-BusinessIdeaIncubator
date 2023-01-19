import {createApp} from 'vue'
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from '@/firebase'
import {router} from "@/routes"
import {md} from "@/directives/md";
import {date} from "@/directives/date";
import App from './app.vue'
import "./registerServiceWorker";
import './assets/main.css'
import '@picocss/pico'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faBars, faLink, faLinkSlash} from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faLink, faLinkSlash)

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
