<template>
    <div class="userlist-box">
        <h3>Users in this organization:</h3>
        <div v-for="user of getUsers" :key="user.id">
            <p>User: {{ user.name }} {{ user.email === $auth.user.email ? "(You)" : "" }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.organizationRole }}</p>
            <select v-model="changedUserRoles[user.id]">
                <option disabled selected value="">Please select new role</option>
                <option v-for="role in possibleRoles(user.id)" :key="role.name"> {{ role.name }} </option>
            </select>
            <button @click="() => changeUserRole(user.id)">Change user role</button>
            <button @click="() => deleteUser(user.id)">Delete user</button>
            <br />
        </div>

        <div class="invite-user-box">
            <input v-model="newUserEmail" type="email" placeholder="New user email" />
            <select v-model="newUserRole">
                <option disabled value="">Please select one</option>
                <option v-for="role in getRoles" :key="role.name"> {{ role.name }} </option>
            </select>
            <button @click="invite">Invite new user</button>
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

<style scoped>
.userlist-box {
    background-color: azure;
    padding: 5px;
    margin: 5px;
}
</style>
