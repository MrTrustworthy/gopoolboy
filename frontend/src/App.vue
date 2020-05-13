<template>
    <div id="app">
        <Header msg="Poolboy"/>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {
            Header
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 60px;
        color: rgb(31, 135, 181);
        background-color: antiquewhite;
    }

    a:link {
        color: rgb(31, 135, 181);
    }

    a:visited {
        color: rgb(31, 135, 181);
    }

    a:active {
        color: rgb(31, 135, 181);
    }

</style>
