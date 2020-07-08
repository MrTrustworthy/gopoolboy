import Vue from "vue";
import VueRouter from "vue-router";
import Search from "./views/Search.vue";
import AboutView from "./views/About.vue";
import CrumbDetailView from "./views/CrumbDetail.vue";
import ProfileView from "./views/Profile.vue";
import OrganizationView from "./views/Organization.vue";
import {encodeId} from "@/urlids";
import {authGuard} from "./auth/authGuard";
import TagOverview from "./views/TagOverview";
import TagDetailView from "./views/TagDetail";

Vue.use(VueRouter);

const redirectIds = (routeName) => {
    return (to, from, next) => {
        if (isNaN(to.params.id)) {
            next();
            return;
        }
        let id = encodeId(to.params.id);
        console.log("Redirecting plain ID", to.params.id, "to nice ID", id);
        next({name: routeName, params: {id: id}});
    };
};

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
            name: "search",
            component: Search,
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
            beforeEnter: redirectIds("crumbdetail"),
        },
        {
            path: "/tags",
            name: "tags",
            component: TagOverview,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/tags/:id",
            name: "tagdetail",
            component: TagDetailView,
            meta: {
                requiresLogin: true,
            },
            beforeEnter: redirectIds("tagdetail"),
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

router.beforeEach((to, from, next) => {
    if (to.name === null) {
        next({name: "crumbs"});
        return;
    }
    next();
});
