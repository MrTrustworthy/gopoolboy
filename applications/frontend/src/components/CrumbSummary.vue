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
            <md-list>
                <md-list-item>
                    <md-button v-bind:to="'/crumbs/' + fromId(getCrumb.id)">{{ getCrumb.title }}</md-button>
                    <md-badge
                        v-bind:class="linkedCrumbs !== 0 ? 'md-primary' : 'md-accent'"
                        v-bind:md-content="linkedCrumbs"
                    />
                </md-list-item>
            </md-list>
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
            linkedCrumbs: 0,
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
    },
};
</script>
