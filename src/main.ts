import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import 'bulma/css/bulma.css'

const app = createApp(App)
app.config.performance = true
app.mount('#app')
