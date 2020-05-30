import Vue from "vue";
import { router } from "./router";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import { Auth0Plugin } from "./auth";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_SPA_CLIENT_ID,
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
});

Vue.use(VueMaterial);

new Vue({
    apolloProvider: createProvider(),
    router,
    render: (h) => h(App),
}).$mount("#app");
