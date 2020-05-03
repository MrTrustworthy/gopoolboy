import Vue from 'vue'
import router from './router'
import App from './App.vue'
import {createProvider} from './vue-apollo'

Vue.config.productionTip = false


new Vue({
    apolloProvider: createProvider(),
    router,
    render: h => h(App)
}).$mount('#app')
