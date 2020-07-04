<template>
    <div>
        <v-skeleton-loader v-if="isLoading" type="card"></v-skeleton-loader>

        <v-card v-else-if="$apollo.queries.getCrumbLinkBetween.error">
            An error occured :(
        </v-card>

        <v-card v-else shaped>
            <DetailActionButtons :source-object="linkData" :show-add-link="false"/>

            <v-card-actions>
                <v-row align="center" justify="center">
                    <v-col cols="3" align="center"/>
                    <v-col cols="6">
                        <Votes
                                :votes="linkData.votes"
                                :own-vote="linkData.ownVote"
                                :object-id="linkData.id"
                                object-type="crumblink"
                        />
                    </v-col>
                    <v-col cols="3"/>
                </v-row>

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
        computed: {
            linkData() {
                return this.getCrumbLinkBetween;
            },
            isLoading() {
                return this.getCrumbLinkBetween === undefined || this.$apollo.queries.getCrumbLinkBetween.loading;
            }
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
        },
    };
</script>
