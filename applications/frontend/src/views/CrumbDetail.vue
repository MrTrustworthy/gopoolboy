<template>
    <div id="crumbdetail">
        <Speeddial/>

        <CrumbFull v-bind:id="crumbId" :main="true"/>
        <br>
        <h2>Found a total of {{ getLinkedCrumbIds.length }} linked Crumbs</h2>
        <br>
        <div v-for="qId in getLinkedCrumbIds" :key="qId">
            <CrumbFull v-bind:id="qId"/>

            <v-row justify="center">
                <v-btn fab class="accent" size="36" @click="() => toggleShowLink(qId)">
                    <v-icon>link</v-icon>
                </v-btn>
            </v-row>
            <v-scroll-y-transition>
                <LinkSummary v-if="getShowLink(qId)" :fromId="crumbId" :toId="qId"/>
            </v-scroll-y-transition>
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
    import Speeddial from "@/components/Speeddial.vue";

    import {decodeId} from "@/urlids";
    import LinkSummary from "../components/LinkSummary";

    export default {
        name: "CrumbDetailView",
        components: {
            LinkSummary,
            CrumbFull,
            NewCrumb,
            Speeddial,
        },
        props: {
            showLinkDefault: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                crumbId: decodeId(this.$route.params.id),
                getLinkedCrumbIds: [],
                showLinkFlags: {}
            };
        },
        watch: {
            $route(to) {
                this.crumbId = decodeId(to.params.id);
            },
        },
        methods: {
            getShowLink(crumbId) {
                const showLink = this.showLinkFlags[crumbId];
                return showLink !== undefined ? showLink : this.showLinkDefault;
            },
            toggleShowLink(crumbId) {
                this.$set(this.showLinkFlags, crumbId, !this.getShowLink(crumbId));
            }
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
