<template>
    <div>
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
