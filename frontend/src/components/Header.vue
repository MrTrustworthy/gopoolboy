<template>
    <div class="header">
        <h1>{{ msg }}</h1>
        <img alt="Vue logo" src="../assets/logo.png">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>

    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            msg: String,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .router-link-active {
        color: aquamarine;
    }

    .header {
        overflow: hidden;
    }

    .header img {
        margin-right: 15px;
    }

    .header h1 {
        display: inline-block;
    }
</style>
