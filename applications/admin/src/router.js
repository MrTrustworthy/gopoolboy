import Vue from "vue";
import VueRouter from "vue-router";
import {authGuard} from "./auth/authGuard";
import Home from "./views/Home.vue";
import Users from "./views/Users.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/users",
            name: "users",
            component: Users,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
});

router.beforeEach(authGuard);