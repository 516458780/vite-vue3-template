import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store/index.js'

import helper from './utils/helper.js'

import Vant from './vant.js'
import store from '@/store/module.js'

const app = createApp(App)

app.use(pinia)
app.use(router)
Vant(app)

app.config.globalProperties.$helper = helper
app.config.globalProperties.$store = store

app.mount('#app')
