<template>
    <div class="orga-box">{{ getOrganization.name }} [ID: {{ getOrganization.id }}]</div>
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

<style scoped>
.orga-box {
    background-color: aliceblue;
    padding: 5px;
    margin: 5px;
}
</style>
