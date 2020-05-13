<template>
    <div class="profileDetail">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>

            <template v-if="$auth.isAuthenticated">
                You're signed in and ready to go {{ $auth.user.nickname }} :)
                <button @click="logout">Log out</button>

            </template>

            <template v-else>
                <button @click="login">Login with existing account</button>
                <button @click="signup">Sign up for a new organization</button>
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
            },
            signup() {
                console.log("Lets sign you up!");
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
