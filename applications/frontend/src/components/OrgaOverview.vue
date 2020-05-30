<template>
    <div>{{ getOrganization.name }} [ID: {{ getOrganization.id }}]</div>
</template>

<script>
export default {
    name: "OrgaOverview",
    data() {
        return {
            getOrganization: {},
        };
    },
    apollo: {
        getOrganization: {
            query: require("../graphql/OrganizationOverview.gql"),
        },
        $client: "orgamonClient",
    },
};
</script>
