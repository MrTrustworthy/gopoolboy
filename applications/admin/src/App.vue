<template>
    <v-app>
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />

        <v-app-bar app clipped-left hide-on-scroll class="secondary">
            <img src="./assets/icon.png" width="64" height="64"/>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" mini-variant expand-on-hover clipped permanent app class="primary">
            <NavigationBar></NavigationBar>
        </v-navigation-drawer>

        <v-main class="secondary">
            <v-container>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                        <v-slide-x-transition hide-on-leave>
                            <router-view :key="$route.path"/>
                        </v-slide-x-transition>
                    </v-col>
                    <v-col cols="2"></v-col>
                </v-row>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>
    import NavigationBar from "./components/NavigationBar";
    export default {
        name: "App",
        components: {NavigationBar},
        data() {
            return {
                drawer: true
            };
        }
    };
</script>



