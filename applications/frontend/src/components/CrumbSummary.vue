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
            <md-list-item :to="'/crumbs/' + fromId(getCrumb.id)">
                <div class="md-list-item-text">
                    <span>{{ getCrumb.title }}</span>
                                        <span>{{ getCrumb.text }}</span>

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
    import { fromId } from "@/urlids";

    export default {
        name: "CrumbSummary",
        props: {
            id: String,
        },
        data() {
            return {
                getCrumb: {},
                fromId: fromId,
                getLinkedCrumbIds: [],
            };
        },
        apollo: {
            getCrumb: {
                query: require("../graphql/GetCrumb.gql"),
                variables() {
                    return { id: this.id };
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
