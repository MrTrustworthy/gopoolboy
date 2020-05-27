import Vue from "vue";
import { router } from "./router";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import { Auth0Plugin } from "./auth";

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_SPA_CLIENT_ID,
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
});

console.log("Running with env VUE_APP_QAPP_GRAPHQL_HTTP", process.env.VUE_APP_QAPP_GRAPHQL_HTTP);
console.log("Running with env VUE_APP_QAPP_GRAPHQL_TOKEN_NAME", process.env.VUE_APP_QAPP_GRAPHQL_TOKEN_NAME);
console.log("Running with env VUE_APP_ORGAMON_GRAPHQL_HTTP", process.env.VUE_APP_ORGAMON_GRAPHQL_HTTP);
console.log("Running with env VUE_APP_ORGAMON_GRAPHQL_TOKEN_NAME", process.env.VUE_APP_ORGAMON_GRAPHQL_TOKEN_NAME);
console.log("Running with env VUE_APP_AUTH0_DOMAIN", process.env.VUE_APP_AUTH0_DOMAIN);
console.log("Running with env VUE_APP_AUTH0_AUDIENCE", process.env.VUE_APP_AUTH0_AUDIENCE);
console.log("Running with env VUE_APP_AUTH0_SPA_CLIENT_ID", process.env.VUE_APP_AUTH0_SPA_CLIENT_ID);

new Vue({
    apolloProvider: createProvider(),
    router,
    render: (h) => h(App),
}).$mount("#app");
