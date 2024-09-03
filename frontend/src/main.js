import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { vueKeycloak } from '@josempgon/vue-keycloak'

const app = createApp(App)


app.use(vueKeycloak, {
    config: {
      url: 'http://localhost:9090',
      realm: 'EmployeeKey',
      clientId: 'client',
    },
    initOptions: {
      flow: 'standard', 
      checkLoginIframe: false, 
      onLoad: 'login-required', 
    }
  })
  
app.use(router)

app.mount('#app')

