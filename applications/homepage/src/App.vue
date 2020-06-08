<template>
    <div id="app">
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary" md-elevation="5">

                <span class="md-title">GoPoolboy!</span>
                <img src="./assets/icon.png" width="64" height="64"/>


                <md-tabs class="md-primary" md-alignment="right">
                    <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>

                    <md-tab id="tab-signup" md-label="Sign Up!" to="/signup"></md-tab>
                </md-tabs>
            </md-app-toolbar>

            <md-app-content>
                <div class="md-layout">
                    <div class="md-layout-item"></div>
                    <div class="md-layout-item md-large-size-70 md-medium-size-80 md-small-size-100 md-xsmall-size-100">
                        <router-view/>
                    </div>
                    <div class="md-layout-item"></div>
                </div>
            </md-app-content>
        </md-app>

    </div>
</template>

<script>
    export default {
        name: "App",
        components: {},
    };
</script>
