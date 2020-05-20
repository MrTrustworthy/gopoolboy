<template>
    <div class="header">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <h1>{{ msg }}</h1>
        <img alt="Poolboy logo" src="../assets/icon.png" width="128" height="128" />
        <ProfileHeader />
        <router-link to="/organization">Organization</router-link>
    </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";

export default {
    name: "Header",
    props: {
        msg: String,
    },
    components: {
        ProfileHeader,
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    overflow: hidden;
}

.header img {
    margin-right: 15px;
    display: inline-block;
}

.header h1 {
    display: inline-block;
}
</style>
