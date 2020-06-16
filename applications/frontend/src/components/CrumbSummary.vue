<template>
    <div>
        <div v-if="$apollo.queries.getCrumb.loading">
            <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            <md-list-item>
                An error occured :(
            </md-list-item>
        </div>

        <div v-else>

            <v-list-item @click="clickItem" two-line>
                <v-list-item-icon>
                    <v-icon>{{ getCrumb.type === "question" ? "help" : "announcement" }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ getCrumb.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ textSummary }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-chip>{{ getCrumb.votes + ' Votes' }}</v-chip>
                    <v-chip>{{ getLinkedCrumbIds.length + ' Linked' }}</v-chip>
                </v-list-item-action>
            </v-list-item>

        </div>
    </div>
</template>

<script>

    export default {
        name: "CrumbSummary",
        props: {
            id: String,
            textPreviewLength: {
                type: Number,
                default: 37
            }
        },
        data() {
            return {
                getCrumb: {},
                getLinkedCrumbIds: [],
            };
        },
        computed: {
            textSummary() {
                const ellipses = this.getCrumb.text.length >= this.textPreviewLength ? "..." : "";
                return this.getCrumb.text.substring(0, this.textPreviewLength) + ellipses;
            }
        },
        methods: {
            clickItem() {
                this.$emit("clicked-summary", this.id);
            }
        },
        apollo: {
            getCrumb: {
                query: require("../graphql/GetCrumb.gql"),
                variables() {
                    return {id: this.id};
                },
                client: "crumblerClient",
            },
            getLinkedCrumbIds: {
                query: require("../graphql/GetLinkedCrumbIds.gql"),
                variables() {
                    return {
                        id: this.id,
                    };
                },
                client: "zeldaClient",
            },

        },
    };
</script>
