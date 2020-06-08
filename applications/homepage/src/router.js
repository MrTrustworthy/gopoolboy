import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "./views/LandingPage";
import SignupPage from "./views/SignupPage";

export const linkActiveClass = "vue-material-link-active";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "landingpage",
            component: LandingPage,
        },
                {
            path: "/signup",
            name: "signup",
            component: SignupPage,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                // , offset: { x: 0, y: 10 }
            };
        }
    },
    linkActiveClass,
});
