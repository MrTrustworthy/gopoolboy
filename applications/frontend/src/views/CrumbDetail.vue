<template>
    <div id="crumbdetail">
        <CreateWidgetSnackbar/>

        <CrumbFull v-bind:id="crumbId"/>
        <h2>Found a total of {{ getLinkedCrumbIds.length }} linked Crumbs</h2>
        <div v-for="qId of getLinkedCrumbIds" :key="qId">
            <LinkSummary :fromId="crumbId" :toId="qId"/>
            <CrumbFull v-bind:id="qId"/>
            <br>
            <br>
        </div>
        <h2>Post new response</h2>
        <NewCrumb crumbType="answer" :linkTo="crumbId"/>
    </div>
</template>

<script>
    import CrumbFull from "@/components/CrumbFull.vue";
    import NewCrumb from "@/components/NewCrumb.vue";
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";

    import {toId} from "@/urlids";
    import LinkSummary from "../components/LinkSummary";

    export default {
        name: "CrumbDetailView",
        components: {
            LinkSummary,
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
