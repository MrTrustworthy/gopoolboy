<template>
    <v-app>
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />

        <v-app-bar app class="secondary">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <img src="./assets/icon.png" width="64" height="64"/>
            <span style="flex: 1"></span>
            <SearchToolbar/>
            <span style="flex: 1"></span>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary app class="secondary">
            <NavigationBar/>
        </v-navigation-drawer>

        <v-main class="secondary">
            <v-container>
                <transition name="slide-right">
                    <router-view/>
                </transition>
            </v-container>
        </v-main>

        <Notifications/>

    </v-app>

</template>

<script>
    import NavigationBar from "./components/NavigationBar.vue";
    import Notifications from "./components/Notifications";
    import SearchToolbar from "./components/SearchToolbar";

    export default {
        name: "App",
        components: {
            SearchToolbar,
            Notifications,
            NavigationBar,
        },
        data() {
            return {
                drawer: false
            };
        }
    };
</script>
<style scoped>
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: 0.5s;
        transition-property: height, opacity, transform;
        transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
        overflow: hidden;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(2em, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-2em, 0);
    }
</style>


