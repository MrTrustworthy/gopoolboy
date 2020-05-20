<template>
    <div class="userlist-box">
        <h3>Users in this organization:</h3>
        <div v-for="user of getUsers" :key="user.email">
            <p>User: {{ user.name }} {{ user.email === $auth.user.email ? "(You)" : "" }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.organizationRole }}</p>
            <br />
        </div>

        <div class="invite-user-box">
            <input v-model="newUserEmail" type="email" placeholder="New user email" />
            <select v-model="newUserRole">
                <option disabled value="">Please select one</option>
                <option v-for="role in getRoles" :key="role.name">
                    {{ role.name }}
                </option>
            </select>
            <button @click="invite">
                Invite new user
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrgaUserList",
    data() {
        return {
            getUsers: [],
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
