import Vue from "vue";
import VueRouter from "vue-router";
import CrumbsView from "./views/Crumbs.vue";
import AboutView from "./views/About.vue";
import CrumbDetailView from "./views/CrumbDetail.vue";
import ProfileView from "./views/Profile.vue";
import WelcomeView from "./views/Welcome.vue";
import OrganizationView from "./views/Organization.vue";
import { fromId } from "@/urlids";

export const linkActiveClass = "vue-material-link-active";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/about",
            name: "about",
            component: AboutView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/crumbs",
            name: "crumbs",
            component: CrumbsView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/crumbs/:id",
            name: "crumbdetail",
            component: CrumbDetailView,
            meta: {
                requiresLogin: true,
            },
            beforeEnter: (to, from, next) => {
                if (!isNaN(to.params.id)) {
                    let id = fromId(to.params.id);
                    console.log("Redirecting plain ID", to.params.id, "to nice ID", id);
                    next({ name: "crumbdetail", params: { id: id } });
                    return;
                }
                next();
            },
        },
        {
            path: "/profile/:userId",
            name: "profile",
            component: ProfileView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/organization",
            name: "organization",
            component: OrganizationView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/welcome",
            name: "welcome",
            component: WelcomeView,
        },
    ],
    linkActiveClass,
});

router.beforeEach((to, from, next) => {
    if (to.name === null) {
        next({ name: "crumbs" });
        return;
    }
    // could look for a better way that doesn't rely on simply a tokens existence, since it might be invalid
    if (to.name !== "welcome" && !localStorage.getItem(process.env.VUE_APP_GRAPHQL_TOKEN_NAME))
        next({ name: "welcome" });
    else next();
});
