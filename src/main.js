import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "@tsparticles/vue3";
import { loadFull } from 'tsparticles'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Particles, {
    init: async engine => {
        await loadFull(engine); 
    },
})
app.mount('#app')