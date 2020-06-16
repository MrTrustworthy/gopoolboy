<template>
    <div id="crumbdetail">
        <Speeddial/>

        <CrumbFull v-bind:id="crumbId" v-on:added-link="refresh"/>
        <h2>Found a total of {{ getLinkedCrumbIds.length }} linked Crumbs</h2>
        <div v-for="qId of getLinkedCrumbIds" :key="qId">
            <LinkSummary :fromId="crumbId" :toId="qId"/>
            <CrumbFull v-bind:id="qId" v-on:added-link="refresh"/>
            <br>
            <br>
        </div>
        <h2>Post new response</h2>
        <NewCrumb crumbType="answer" :linkTo="crumbId" v-on:confirmed-action="refresh"/>
    </div>
</template>

<script>
    import CrumbFull from "@/components/CrumbFull.vue";
    import NewCrumb from "@/components/NewCrumb.vue";
    import Speeddial from "@/components/Speeddial.vue";

    import {toId} from "@/urlids";
    import LinkSummary from "../components/LinkSummary";

    export default {
        name: "CrumbDetailView",
        components: {
            LinkSummary,
            CrumbFull,
            NewCrumb,
            Speeddial,
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
        methods: {
            refresh() {
                this.$apollo.queries.getLinkedCrumbIds.refetch();
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
