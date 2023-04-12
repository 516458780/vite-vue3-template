import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { storeModel, store } from '@/store/index.js'
import helper from './utils/helper.js'

import Vant from './vant.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
Vant(app)

app.config.globalProperties.$helper = helper
app.config.globalProperties.$store = store
app.config.globalProperties.$storeModel = storeModel

app.mount('#app')
