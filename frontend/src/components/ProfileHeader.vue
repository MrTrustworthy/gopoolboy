<template>
    <div class="profile">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>

            <template v-if="!$auth.isAuthenticated">
                <button @click="login">Log in</button>
            </template>

            <template v-else>
                <h2>Name: {{ $auth.user.name }}</h2>
                <p>Mail: {{ $auth.user.email }}</p>
                <button @click="logout">Log out</button>
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
            },
            // Log the user out
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .profile {
        overflow: hidden;
    }

    .profile {
        background-color: aqua;
    }

</style>
