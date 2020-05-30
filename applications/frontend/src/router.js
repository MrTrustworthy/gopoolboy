import Vue from "vue";
import VueRouter from "vue-router";
import QuestionsView from "./views/Questions.vue";
import AboutView from "./views/About.vue";
import DetailView from "./views/Detail.vue";
import ProfileView from "./views/Profile.vue";
import WelcomeView from "./views/Welcome.vue";
import OrganizationView from "./views/Organization.vue";
import NewView from "./views/New.vue";

export const linkActiveClass = "vue-material-link-active";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/q",
            name: "questions",
            component: QuestionsView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/q/:id",
            name: "detail",
            component: DetailView,
            meta: {
                requiresLogin: true,
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
            path: "/new",
            name: "new",
            component: NewView,
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
        next({ name: "questions" });
        return;
    }
    // could look for a better way that doesn't rely on simply a tokens existence, since it might be invalid
    if (to.name !== "welcome" && !localStorage.getItem(process.env.VUE_APP_QAPP_GRAPHQL_TOKEN_NAME))
        next({ name: "welcome" });
    else next();
});
