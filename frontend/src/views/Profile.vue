<template>
    <div class="profile">
        <ProfileDetail />
        <OrgaOverview />
        <OrgaUserList />
    </div>
</template>

<script>
import ProfileDetail from "@/components/ProfileDetail.vue";
import OrgaOverview from "../components/OrgaOverview";
import OrgaUserList from "../components/OrgaUserList";
export default {
    name: "Home",
    components: {
        ProfileDetail,
        OrgaOverview,
        OrgaUserList,
    },
};
</script>

<style scoped>
.profile {
    margin-top: 60px;
}
</style>
