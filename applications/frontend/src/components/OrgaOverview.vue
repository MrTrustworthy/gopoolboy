<template>
    <v-card>
        <v-card-title> {{ getOrganization.name }}</v-card-title>
        <v-card-subtitle>Organization ID: {{ getOrganization.id }}</v-card-subtitle>
        <v-card-actions>
            <v-btn disabled>Close Account</v-btn>
        </v-card-actions>
    </v-card>
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
                query: require("../graphql/GetOrganization.gql"),
            },
            $client: "orgamonClient",
        },
    };
</script>
