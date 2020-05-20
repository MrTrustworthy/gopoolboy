<template>
    <div class="profile">
        <ProfileDetail />
    </div>
</template>

<script>
import ProfileDetail from "@/components/ProfileDetail.vue";
export default {
    name: "Profile",
    components: {
        ProfileDetail,
    },
};
</script>

<style scoped>
.profile {
    margin-top: 60px;
}
</style>
