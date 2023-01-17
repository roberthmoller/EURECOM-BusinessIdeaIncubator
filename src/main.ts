import {createApp} from 'vue'
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './firebase'
import {router} from "./routes"
import App from './App.vue'
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
    .mount('#app')
