<template>
    <div class="profile">
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>
            <template v-if="!$auth.isAuthenticated">
                <button @click="login">Log in</button>
            </template>
            <template v-else>
                <router-link tag="img" width="64" height="64" :src="$auth.user.picture" to="/profile" />
            </template>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ProfileHeader',
        methods: {
            // Log the user in
            login() {
                this.$auth.loginWithRedirect();
            }
        }
    }
</script>

<style scoped>
    .profile {
        overflow: hidden;
    }

    .profile {
        background-color: aqua;
    }
</style>
