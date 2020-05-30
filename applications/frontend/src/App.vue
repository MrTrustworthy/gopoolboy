<template>
    <div id="app">
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
        />
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
};
</script>
