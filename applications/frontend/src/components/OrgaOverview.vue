<template>
    <md-card>
        <md-card-header>
            <div class="md-title">
                {{ getOrganization.name }}
            </div>
            <div class="md-subhead">Organization ID <br />{{ getOrganization.id }}</div>
        </md-card-header>

        <md-card-actions>
            <md-button class="md-accent" disabled>Close Account</md-button>
        </md-card-actions>
    </md-card>
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
