<template>
    <div class="profileDetail">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>

            <template v-if="!$auth.isAuthenticated">
                <button @click="login">Log in</button>
            </template>

            <template v-else>
                <p>Nickname: {{ $auth.user.nickname }}</p>
                <p>Name: {{ $auth.user.name }}</p>
                <p>Sub: {{ $auth.user.sub }}</p>
                <p>Email: {{ $auth.user.email }}</p>
                <img width="64" height="64" :src="$auth.user.picture">
                <button @click="logout">Log out</button>
            </template>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ProfileDetail',
        methods: {
            login() {
                this.$auth.loginWithRedirect();
            },
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
    .profileDetail {
        overflow: hidden;
    }

    .profileDetail {
        background-color: darkslategrey;
    }

</style>
