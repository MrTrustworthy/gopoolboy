<template>
    <div>
        <v-skeleton-loader v-if="isLoading" type="card"></v-skeleton-loader>
        <div v-else-if="$apollo.queries.getOrganization.error">
            An error occured :(
        </div>

        <v-card v-else shaped class="elevation-1">
            <v-container>
                <v-card-title> {{ getOrganization.name }}</v-card-title>
                <v-card-subtitle>Organization ID: {{ getOrganization.id }}</v-card-subtitle>
                <CreatedAListItem :timestamp="getOrganization.createdAt" />
                <v-card-actions>
                    <v-btn disabled>Close Account</v-btn>
                    <v-btn disabled>Change Plan</v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import CreatedAListItem from "./CreatedAtListItem";
    export default {
        name: "OrgaOverview",
        components: {CreatedAListItem},
        data() {
            return {
                getOrganization: {},
            };
        },
        computed: {
            isLoading() {
                return this.getOrganization === undefined || this.$apollo.queries.getOrganization.loading;
            }
        },
        apollo: {
            getOrganization: {
                query: require("../graphql/GetOrganization.gql"),
            },
            $client: "orgamonClient",
        },
    };
</script>
