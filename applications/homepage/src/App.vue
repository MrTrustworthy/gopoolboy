<template>
    <div id="app">
        <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary" md-elevation="1">
                <span class="md-title">GoPoolboy!</span>
                <img src="./assets/icon.png" width="64" height="64"/>
            </md-app-toolbar>

            <md-app-content>
                <div class="md-layout">
                    <div class="md-layout-item"></div>
                    <div class="md-layout-item md-large-size-40 md-medium-size-50 md-small-size-75 md-xsmall-size-90">
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
