<template>
    <div>
        <div v-if="$apollo.queries.getCrumbLinkBetween.loading">
            <v-skeleton-loader type="card"></v-skeleton-loader>
        </div>

        <div v-else-if="$apollo.queries.getCrumbLinkBetween.error">
            <v-card>
                An error occured :(
            </v-card>
        </div>

        <div v-else>
            <v-card>

                <v-list dense>
                    <AuthorListItem :author-id="getCrumbLinkBetween.authorId"/>
                    <CreatedAtListItem :timestamp="getCrumbLinkBetween.createdAt"/>
                </v-list>

                <v-card-actions>
                    <Votes
                            :votes="getCrumbLinkBetween.votes"
                            :own-vote="getCrumbLinkBetween.ownVote"
                            :object-id="getCrumbLinkBetween.id"
                            object-type="crumblink"
                    />
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    import Votes from "./Votes";
    import AuthorListItem from "./AuthorListItem";
    import CreatedAtListItem from "./CreatedAtListItem";

    export default {
        name: "LinkSummary",
        components: {CreatedAtListItem, AuthorListItem, Votes},
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
