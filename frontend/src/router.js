import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from './views/Home.vue'
import AboutView from './views/About.vue'
import DetailView from './views/Detail.vue'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        },
        {
            path: "/q/:id",
            name: "detail",
            component: DetailView
        },
    ]

})