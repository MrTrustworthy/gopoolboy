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
                    <div class="md-subhead">Linked by: {{ getCrumbLinkBetween.authorId }}</div>
                    <div class="md-subhead">
                        {{ relativeMicrosTS(getCrumbLinkBetween.createdAt) }}
                        <md-tooltip md-direction="left" md-delay="150">
                            {{ prettyTime(getCrumbLinkBetween.createdAt) }}
                        </md-tooltip>
                    </div>
                </md-card-header>

                <md-card-actions>
                    <md-badge
                            v-bind:class="'md-square ' + (getCrumbLinkBetween.votes !== 0 ? 'md-primary' : 'md-accent')"
                            v-bind:md-content="getCrumbLinkBetween.votes + ' Votes'"
                    />
                    <md-button class="md-primary" @click="() => console.log('no')">
                        <md-icon>arrow_upward</md-icon>
                    </md-button>
                </md-card-actions>
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
