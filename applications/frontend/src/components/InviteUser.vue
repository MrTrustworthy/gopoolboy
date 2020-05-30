<template>
    <md-card>
        <md-card-header class="md-title">
            Invite new User
        </md-card-header>

        <md-card-content>
            <md-field>
                <md-input v-model="newUserEmail" type="email" placeholder="New user email" />
            </md-field>
            <md-field>
                <md-select v-model="newUserRole" placeholder="Role">
                    <md-option v-for="role in getRoles" :key="role.name" :value="role.name">
                        {{ role.name }}
                    </md-option>
                </md-select>
            </md-field>
        </md-card-content>

        <md-card-actions>
            <md-button class="md-primary" @click="invite">Invite new user</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
    name: "InviteUser",
    data() {
        return {
            newUserEmail: "",
            newUserRole: "",
            getRoles: [],
        };
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
