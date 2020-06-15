<template>
    <div>
        <div v-if="$apollo.queries.getCrumb.loading">
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
        <div v-else-if="$apollo.queries.getCrumb.error">
            <md-list-item>
                An error occured :(
            </md-list-item>
        </div>

        <div v-else>
            <md-list-item @click="clickItem">
                <div class="md-list-item-text">
                    <span>{{ getCrumb.title }}</span>
                    <span>{{ textSummary }}</span>
                </div>
                <md-badge
                        v-bind:class="'md-square ' + (getCrumb.votes !== 0 ? 'md-primary' : 'md-accent')"
                        v-bind:md-content="getCrumb.votes + ' Votes'"
                />
                <md-badge
                        v-bind:class="'md-square ' + (getLinkedCrumbIds.length !== 0 ? 'md-primary' : 'md-accent')"
                        v-bind:md-content="getLinkedCrumbIds.length + ' Linked'"
                />
            </md-list-item>
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
