<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">Create new Organization</div>
            </md-card-header>

            <md-card-content>
                <md-field>
                    <label>Organization Name</label>
                    <md-input v-model="orgaName" type="text" maxlength="120" md-autogrow :disabled="inputDisabled"/>
                </md-field>
                <md-field>
                    <label>Owner Email</label>
                    <md-input v-model="creatorEmail" type="email" md-autogrow :disabled="inputDisabled"/>
                </md-field>
            </md-card-content>

            <md-card-actions>
                <md-button @click="signup" class="md-raised md-primary" :disabled="inputDisabled">Sign up</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
    export default {
        name: "NewOrganization",
        data() {
            return {
                orgaName: "",
                creatorEmail: "",
                inputDisabled: false,
            };
        },
        apollo: {
            $client: "orgamonClient",
        },
        methods: {
            signup() {
                console.log("Creating new organization", this.orgaName, "with owner", this.creatorEmail);
                this.$apollo.mutate({
                    mutation: require("../graphql/CreateOrganization.gql"),
                    variables: {
                        name: this.orgaName,
                        creatorEmail: this.creatorEmail,
                    },
                });
                this.orgaName = "";
                this.creatorEmail = "";
                this.inputDisabled = true;
                this.$store.commit("addPendingNotification", "Thank you for creating an organization! Please check your emails to login");
            },
        },
    };
</script>
