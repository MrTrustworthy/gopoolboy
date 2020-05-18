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
                <template v-if="!newOrgaCreated">
                    <button @click="login">Login with existing account</button>
                    <br />
                    <input v-model="orgaName" placeholder="Organization Name" />
                    <input v-model="creatorEmail" type="email" placeholder="Your Email" />
                    <button @click="signup">
                        Sign up for a new organization
                    </button>
                </template>
                <template v-else>
                    <p>
                        Thank you for signing up! Please check your emails to sign into Poolboy
                    </p>
                </template>
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
            newOrgaCreated: false,
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
        signup() {
            console.log("Lets sign you up!", this.orgaName, this.creatorEmail);
            //this.newOrgaCreated = true;
            this.$apollo.mutate({
                mutation: require("../graphql/CreateOrganization.gql"),
                variables: {
                    name: this.orgaName,
                    creatorEmail: this.creatorEmail,
                },
            });
        },
    },
};
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
