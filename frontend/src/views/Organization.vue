<template>
    <div class="organization">
        <OrgaOverview />
        <OrgaUserList />
    </div>
</template>

<script>
import OrgaOverview from "../components/OrgaOverview";
import OrgaUserList from "../components/OrgaUserList";
export default {
    name: "Organization",
    components: {
        OrgaOverview,
        OrgaUserList,
    },
};
</script>

<style scoped>
.organization {
    margin-top: 60px;
}
</style>
