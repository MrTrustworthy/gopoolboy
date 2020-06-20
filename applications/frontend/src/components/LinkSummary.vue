<template>
    <div>
        <v-skeleton-loader v-if="$apollo.queries.getCrumbLinkBetween.loading" type="card"></v-skeleton-loader>

        <v-card v-else-if="$apollo.queries.getCrumbLinkBetween.error">
            An error occured :(
        </v-card>

        <v-card v-else shaped>
            <DetailActionButtons :source-object="getCrumbLinkBetween" :show-add-link="false"/>
            <v-card-actions class="justify-center">
                <Votes
                        :votes="getCrumbLinkBetween.votes"
                        :own-vote="getCrumbLinkBetween.ownVote"
                        :object-id="getCrumbLinkBetween.id"
                        object-type="crumblink"
                />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import Votes from "./Votes";
    import DetailActionButtons from "./DetailActionButtons";

    export default {
        name: "LinkSummary",
        components: {DetailActionButtons, Votes},
        props: {
            fromId: [String, Number],
            toId: [String, Number],
        },
        data() {
            return {
                getCrumbLinkBetween: {},
                getUsers: []
            };
        },
        apollo: {
            getCrumbLinkBetween: {
                query: require("../graphql/GetCrumbLinkBetween.gql"),
                variables() {
                    return {
                        fromId: this.fromId,
                        toId: this.toId
                    };
                },
                client: "zeldaClient",
            },
            getUsers: {
                query: require("../graphql/GetUsers.gql"),
                client: "orgamonClient",
            },
        },
    };
</script>
