<template>
    <div class="userlist-box">
        <h3>Users in this organization:</h3>
        <div v-for="user of getUsers" :key="user.email">
            <p>User: {{ user.name }} {{ user.email === $auth.user.email ? "(You)" : "" }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.tenantRole }}</p>
            <br />
        </div>

        <div class="invite-user-box">
            <input v-model="newUserEmail" type="email" placeholder="New user email" />
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
        };
    },
    apollo: {
        getUsers: {
            query: require("../graphql/OrganizationUserList.gql"),
        },
        $client: "orgamonClient",
    },
    methods: {
        invite() {
            console.log("Inviting new user", this.newUserEmail);
            this.$apollo
                .mutate({
                    mutation: require("../graphql/InviteUser.gql"),
                    variables: {
                        email: this.newUserEmail,
                        role: "owner",
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
