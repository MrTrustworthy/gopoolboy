<template>
    <div id="organization">
        <h2>Organization Info</h2>
        <OrgaOverview/>
        <br/>
        <h2>Users</h2>
        <div v-for="user of getUsers" :key="user.id">
            <ProfileDetail v-bind:userId="user.id" :editable="true"/>
            <br/>
        </div>
        <InviteUser/>
    </div>
</template>

<script>
    import OrgaOverview from "../components/OrgaOverview";
    import ProfileDetail from "../components/ProfileDetail";
    import InviteUser from "../components/InviteUser";

    export default {
        name: "Organization",
        components: {
            OrgaOverview,
            ProfileDetail,
            InviteUser,
        },
        data() {
            return {
                getUsers: [],
            };
        },
        apollo: {
            getUsers: {
                query: require("../graphql/GetUsers.gql"),
            },
            $client: "orgamonClient",
        },
    };
</script>
