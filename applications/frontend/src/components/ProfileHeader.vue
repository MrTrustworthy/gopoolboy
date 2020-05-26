<template>
    <div class="profile">
        <div v-if="$auth.loading">
            <p>Loading</p>
        </div>
        <div v-else>
            <template v-if="$auth.isAuthenticated">
                <router-link tag="img" width="64" height="64" :src="$auth.user.picture" to="/profile" />
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileHeader",
};
</script>

<style scoped>
.profile {
    overflow: hidden;
}

.profile {
    background-color: whitesmoke;
}
</style>
