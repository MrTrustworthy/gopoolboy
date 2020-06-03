<template>
    <div>
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="$auth.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card>
                <md-card-header v-if="$auth.isAuthenticated">
                    <div class="md-subhead">
                        You're signed in as user "{{ $auth.user.nickname }}" and ready to go :)
                    </div>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-primary" @click="login">Login</md-button>
                    <md-button class="md-accent" @click="logout">Log out</md-button>
                </md-card-actions>
            </md-card>

            <template> </template>
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
