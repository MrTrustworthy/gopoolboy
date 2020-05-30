<template>
    <div>
        <h3>Users in this organization:</h3>

        <div v-if="$apollo.queries.getUsers.loading" class="loading apollo">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card v-for="user of getUsers" :key="user.id">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">
                            {{ user.nickname }} {{ user.email === $auth.user.email ? "(You)" : "" }}
                        </div>
                        <div class="md-subhead">ID: {{ user.id }}</div>
                    </md-card-header-text>

                    <md-card-media md-small>
                        <img :src="user.picture" alt="UserProfilePic" />
                    </md-card-media>
                </md-card-header>

                <md-card-content>
                    <div>Name: {{ user.name }}</div>
                    <div>Email: {{ user.email }}</div>
                    <div>Role: {{ user.organizationRole }}</div>
                    <div>Created at: {{ user.createdAt }}</div>
                    <div>Last Login: {{ user.lastLogin }}</div>
                    <div>Logins: {{ user.loginCount }}</div>

                    <md-field>
                        <md-select v-model="changedUserRoles[user.id]" placeholder="New Role">
                            <md-option v-for="role in possibleRoles(user.id)" :key="role.name" :value="role.name">
                                {{ role.name }}
                            </md-option>
                        </md-select>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-primary" @click="() => changeUserRole(user.id)">Change user role</md-button>
                    <md-button class="md-accent" @click="() => deleteUser(user.id)">Delete user</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrgaUserList",
    data() {
        return {
            getUsers: [],
            changedUserRoles: {},
            newUserEmail: "",
            newUserRole: "",
            getRoles: [],
        };
    },
    apollo: {
        getUsers: {
            query: require("../graphql/OrganizationUserList.gql"),
        },
        getRoles: {
            query: require("../graphql/GetRoles.gql"),
        },
        $client: "orgamonClient",
    },
    methods: {
        possibleRoles(userId) {
            let userRole = this.getUsers.filter((u) => u.id == userId)[0].organizationRole;
            return this.getRoles.filter((r) => r.name !== userRole);
        },
        changeUserRole(userId) {
            let newRole = this.changedUserRoles[userId];
            if (!newRole) {
                console.log("Can't change the role of an user if no role is selected");
                return;
            }
            console.log("Changing role for user", userId, "to", newRole);
            this.$apollo
                .mutate({
                    mutation: require("../graphql/ChangeUserRole.gql"),
                    variables: {
                        userId: userId,
                        role: newRole,
                    },
                })
                .then((_) => (this.changedUserRoles[userId] = ""));
        },
        deleteUser(userId) {
            console.log("Deleting user", userId);
            this.$apollo.mutate({
                mutation: require("../graphql/DeleteUser.gql"),
                variables: {
                    userId: userId,
                },
            });
        },
    },
};
</script>
