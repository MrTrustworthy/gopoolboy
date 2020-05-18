<template>
    <div class="userlist-box">
        <h3>Users in this organization:</h3>
        <div v-for="user of getUsers" :key="user.email">
            <p>User: {{ user.name }} {{ user.email === $auth.user.email ? "(You)" : "" }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.tenantRole }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrgaUserList",
    data() {
        return {
            getUsers: [],
        };
    },
    apollo: {
        getUsers: {
            query: require("../graphql/OrganizationUserList.gql"),
        },
        $client: "orgamonClient",
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
