<template>
    <v-card shaped>
        <v-container>
            <v-card-title>
                Invite new User
            </v-card-title>

            <v-text-field v-model="newUserEmail" label="New user email" :rules="[rules.required, rules.email]"/>
            <v-select v-model="newUserRole" label="Role" :items="possibleRoleNames"></v-select>

            <v-card-actions>
                <v-btn @click="invite">Invite new user</v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "InviteUser",
        data() {
            return {
                newUserEmail: "",
                newUserRole: "",
                getRoles: [],
                rules: {
                    required: value => !!value || 'Required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Invalid e-mail.';
                    },
                },
            };
        },
        computed: {
            possibleRoleNames() {
                return this.getRoles.map(r => r.name);
            }
        },
        apollo: {
            getRoles: {
                query: require("../graphql/GetRoles.gql"),
            },
            $client: "orgamonClient",
        },
        methods: {
            invite() {
                console.log("Inviting new user", this.newUserEmail, "with role", this.newUserRole);
                if (!this.newUserRole || !this.newUserEmail) {
                    console.log("Can't create user without selecting a role & email first");
                    return;
                }
                this.$apollo
                    .mutate({
                        mutation: require("../graphql/InviteUser.gql"),
                        variables: {
                            email: this.newUserEmail,
                            role: this.newUserRole,
                        },
                    })
                    .then((_) => (this.newUserEmail = ""));
            },
        },
    };
</script>
