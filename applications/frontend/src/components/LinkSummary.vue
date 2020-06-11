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
                        <md-badge
                                v-bind:class="getCrumbLinkBetween.votes !== 0 ? 'md-primary' : 'md-accent'"
                                v-bind:md-content="getCrumbLinkBetween.votes"
                        />
                        <md-button class="md-primary" @click="() => console.log('no')">
                            <md-icon>arrow_upward</md-icon>
                        </md-button>
                    </md-card-media>
                </md-card-header>

            </md-card>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "LinkSummary",
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

        }
    };
</script>
