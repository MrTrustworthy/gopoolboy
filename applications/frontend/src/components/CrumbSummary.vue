<template>
    <div>
        <v-skeleton-loader v-if="$apollo.queries.getCrumb.loading" type="list-item-avatar-two-line"></v-skeleton-loader>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            An error occured :(
        </div>


        <v-list-item v-else @click="clickItem" two-line class="elevation-1">
            <v-list-item-icon>
                <CrumbTypeIcon :crumb-type="getCrumb.type"></CrumbTypeIcon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ getCrumb.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ textSummary }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-chip>
                    {{ getCrumb.votes }}
                    <v-icon>arrow_upward</v-icon>
                    {{ getLinkedCrumbIds.length }}
                    <v-icon>link</v-icon>
                    {{ getCrumb.tags.length }}
                    <v-icon>label</v-icon>
                </v-chip>
            </v-list-item-action>
        </v-list-item>

    </div>
</template>

<script>

    import CrumbTypeIcon from "./CrumbTypeIcon";

    export default {
        name: "CrumbSummary",
        components: {CrumbTypeIcon},
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
                const post = this.getCrumb.text.length >= this.textPreviewLength ? "..." : "";
                return this.getCrumb.text.substring(0, this.textPreviewLength - post.length) + post;
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
