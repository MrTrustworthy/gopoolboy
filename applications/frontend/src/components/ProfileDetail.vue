<template>
    <div class="profileDetail">
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>
            <p>Nickname: {{ $auth.user.nickname }}</p>
            <p>Name: {{ $auth.user.name }}</p>
            <p>Sub: {{ $auth.user.sub }}</p>
            <p>Email: {{ $auth.user.email }}</p>
            <img width="64" height="64" :src="$auth.user.picture" />
            <button @click="logout">Log out</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileDetail",
    methods: {
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
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
