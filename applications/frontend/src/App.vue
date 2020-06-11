<template>
    <div id="app">
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />

        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary" md-elevation="1">
                <md-button class="md-icon-button" @click="() => (menuVisible = !menuVisible)">
                    <md-icon>{{ menuVisible ? "menu_open" : "menu" }}</md-icon>
                </md-button>
                <span class="md-title">GoPoolboy!</span>
                <img src="./assets/icon.png" width="64" height="64"/>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini" md-permanent="clipped">
                <NavigationBar/>
            </md-app-drawer>

            <md-app-content>
                <div class="md-layout">
                    <div class="md-layout-item"></div>
                    <div class="md-layout-item md-large-size-40 md-medium-size-50 md-small-size-75 md-xsmall-size-90">
                        <transition name="slide-right">
                            <router-view/>
                        </transition>
                    </div>
                    <div class="md-layout-item"></div>
                </div>
            </md-app-content>
        </md-app>

        <Notifications/>
    </div>
</template>

<script>
    import NavigationBar from "./components/NavigationBar.vue";
    import Notifications from "./components/Notifications";

    export default {
        name: "App",
        components: {
            Notifications,
            NavigationBar,
        },
        data() {
            return {menuVisible: false};
        },
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
