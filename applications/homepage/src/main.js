import Vue from "vue";
import { linkActiveClass, router } from "./router";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;


Vue.use(VueMaterial);
Vue.material.router.linkActiveClass = linkActiveClass;

new Vue({
    apolloProvider: createProvider(),
    router,
    render: (h) => h(App),
}).$mount("#app");
