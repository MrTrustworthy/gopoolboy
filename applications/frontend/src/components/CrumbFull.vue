<template>
    <div>
        <div v-if="$apollo.queries.getCrumb.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            An error occured :(
        </div>

        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{ getCrumb.title }}</div>
                        <div class="md-subhead">Type: {{ getCrumb.type }}</div>
                        <md-button class="md-subhead" v-bind:to="'/profile/' + getCrumb.authorId">
                            by {{ getUserNickName(getCrumb.authorId) }}
                        </md-button>
                        <div class="md-subhead">
                            {{ relativeMicrosTS(getCrumb.createdAt) }}
                            <md-tooltip md-direction="left" md-delay="150">
                                {{ prettyTime(getCrumb.createdAt) }}
                            </md-tooltip>
                        </div>
                    </md-card-header-text>
                    <md-card-media>
                        <md-badge
                                v-bind:class="getCrumb.votes !== 0 ? 'md-primary' : 'md-accent'"
                                v-bind:md-content="getCrumb.votes"
                        />
                    </md-card-media>
                </md-card-header>
                <md-divider></md-divider>
                <md-card-content>
                    <div>{{ getCrumb.text }}</div>
                </md-card-content>
                <md-divider></md-divider>
                <md-card-actions>
                    <md-chip class="md-primary" v-for="tag in getCrumb.tags" :key="tag.key + tag.value">
                        {{ tag.key }}:{{ tag.value }}
                    </md-chip>
                    <md-button class="md-primary" @click="upvoteCrumb">
                        <md-icon>arrow_upward</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
    import {fromId} from "@/urlids";
    import moment from "moment";

    export default {
        name: "CrumbFull",
        props: {
            id: {type: [String, Number], required: true},
        },
        data() {
            return {
                getCrumb: {},
                fromId: fromId,
                getUsers: [],
            };
        },
        apollo: {
            getCrumb: {
                query: require("../graphql/GetCrumb.gql"),
                variables() {
                    return {id: this.id};
                },
                client: "crumblerClient",
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
            upvoteCrumb() {
                this.$apollo.mutate({
                    mutation: require("../graphql/UpvoteCrumb.gql"),
                    variables: {
                        id: this.id,
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        upvoteCrumb: {
                            __typename: "Crumb",
                            id: this.id,
                            votes: this.getCrumb.votes + 1,
                        },
                    },
                    client: "crumblerClient",
                });
            },
            getUserNickName(userId) {
                let users = this.getUsers.filter((u) => u.id == userId).map((u) => u.nickname);
                if (users.length === 0) {
                    return userId;
                }
                return users[0];
            },
        },
    };
</script>
