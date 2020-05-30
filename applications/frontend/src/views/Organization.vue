<template>
    <div id="organization">
        <OrgaOverview />
        <OrgaUserList />
        <InviteUser />
    </div>
</template>

<script>
import OrgaOverview from "../components/OrgaOverview";
import OrgaUserList from "../components/OrgaUserList";
import InviteUser from "../components/InviteUser";

export default {
    name: "Organization",
    components: {
        OrgaOverview,
        OrgaUserList,
        InviteUser,
    },
};
</script>
