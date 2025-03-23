import App from '@/App.vue'
import router from '@/routes'
import pinia from '@/store'
import '@/style.css'
import '@/middleware'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
