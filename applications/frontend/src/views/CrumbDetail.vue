<template>
    <div id="crumbdetail">
        <CreateWidgetSnackbar />

        <CrumbFull v-bind:id="crumbId" />
        <h2>Found a total of {{ getLinkedCrumbIds.length }} linked Crumbs</h2>
        <CrumbFull v-for="qId of getLinkedCrumbIds" :key="qId" v-bind:id="qId" />
        <h2>Post new response</h2>
        <NewCrumb crumbType="answer" :linkTo="crumbId" />
    </div>
</template>

<script>
import CrumbFull from "@/components/CrumbFull.vue";
import NewCrumb from "@/components/NewCrumb.vue";
import CreateWidgetSnackbar from "@/components/Speeddial.vue";

import { toId } from "@/urlids";

export default {
    name: "CrumbDetailView",
    components: {
        CrumbFull,
        NewCrumb,
        CreateWidgetSnackbar,
    },
    data() {
        return {
            crumbId: toId(this.$route.params.id),
            getLinkedCrumbIds: [],
        };
    },
    watch: {
        $route(to) {
            this.crumbId = toId(to.params.id);
        },
    },
    apollo: {
        getLinkedCrumbIds: {
            query: require("../graphql/GetLinkedCrumbIds.gql"),
            variables() {
                return {
                    id: this.crumbId,
                };
            },
            client: "zeldaClient",
        },
    },
};
</script>
