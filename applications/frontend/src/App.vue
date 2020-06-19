<template>
    <v-app>
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />

        <v-app-bar app class="primary">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <img src="./assets/icon.png" width="64" height="64"/>
            <SearchToolbar/>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary clipped app class="primary">
            <NavigationBar/>
        </v-navigation-drawer>

        <v-main class="primary">
            <v-container>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                        <v-slide-y-transition>
                            <router-view/>
                        </v-slide-y-transition>
                    </v-col>
                    <v-col cols="2"></v-col>
                </v-row>
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



