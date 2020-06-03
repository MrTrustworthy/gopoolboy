<template>
    <div>
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>
            <template v-if="$auth.isAuthenticated">
                You're signed in and ready to go {{ $auth.user.nickname }} :)
            </template>
            <button @click="logout">Log out</button>

            <template>
                <button @click="login">Login with existing account</button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileDetail",
    data() {
        return {
            orgaName: "",
            creatorEmail: "",
        };
    },
    apollo: {
        $client: "orgamonClient",
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
