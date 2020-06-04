<template>
    <div id="app">
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="() => (menuVisible = !menuVisible)">
                    <md-icon>{{ menuVisible ? "menu_open" : "menu" }}</md-icon>
                </md-button>
                <span class="md-title">GoPoolboy!</span>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini" md-permanent="clipped">
                <NavigationBar />
            </md-app-drawer>

            <md-app-content>
                <div class="md-layout">
                    <div class="md-layout-item"></div>
                    <div class="md-layout-item md-size-50">
                        <router-view />
                    </div>
                    <div class="md-layout-item"></div>
                </div>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
    name: "App",
    components: {
        NavigationBar,
    },
    data() {
        return { menuVisible: false };
    },
};
</script>
