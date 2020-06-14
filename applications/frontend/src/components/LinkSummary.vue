<template>
    <div>
        <div v-if="$apollo.queries.getCrumbLinkBetween.loading">
            <md-list-item>
                <md-progress-spinner
                        class="md-accent"
                        :md-stroke="3"
                        :md-diameter="30"
                        md-mode="indeterminate"
                />
            </md-list-item>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumbLinkBetween.error">
            <md-list-item>
                An error occured :(
            </md-list-item>
        </div>

        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <md-button class="md-subhead" v-bind:to="'/profile/' + getCrumbLinkBetween.authorId">
                            Linked by: {{ userName }}
                        </md-button>
                        <div class="md-subhead">
                            {{ relativeMicrosTS(getCrumbLinkBetween.createdAt) }}
                            <md-tooltip md-direction="left" md-delay="150">
                                {{ prettyTime(getCrumbLinkBetween.createdAt) }}
                            </md-tooltip>
                        </div>
                    </md-card-header-text>
                    <md-card-media>
                        <Votes
                                :votes="getCrumbLinkBetween.votes"
                                :own-vote="getCrumbLinkBetween.ownVote"
                                :object-id="getCrumbLinkBetween.id"
                                object-type="crumblink"
                        />
                    </md-card-media>
                </md-card-header>

            </md-card>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import Votes from "./Votes";

    export default {
        name: "LinkSummary",
        components: {Votes},
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
            userName() {
                let userId = this.getCrumbLinkBetween.authorId;
                let users = this.getUsers.filter((u) => u.id === userId).map((u) => u.nickname);
                if (users.length === 0) {
                    return userId;
                }
                return users[0];
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
            getUsers: {
                query: require("../graphql/GetUsers.gql"),
                client: "orgamonClient",
            },
        },
        methods: {
            relativeMicrosTS(ts) {
                return moment(ts, "x").fromNow();
            },
            prettyTime(ts) {
                return moment(ts, "x").calendar();
            },
            getVoteStyle(vote) {
                return vote === this.getCrumbLinkBetween.ownVote ? 'md-accent' : 'md-primary';
            },
            voteCrumbLink(vote) {
                // remove vote if it's the already-active vote
                if (vote === this.getCrumbLinkBetween.ownVote) vote = 0;

                this.$apollo.mutate({
                    mutation: require("../graphql/VoteCrumbLink.gql"),
                    variables: {
                        id: this.getCrumbLinkBetween.id,
                        vote: vote
                    },
                    client: "zeldaClient",
                });
            },
        }
    };
</script>
