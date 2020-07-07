<template>
    <v-timeline>
        <v-timeline-item
                v-for="item in orderedItems"
                :key="item.__typename + item.id"
                large
                :color="iconColor(item)"
                :right="item.__typename === 'Crumb'"
                :left="item.__typename !== 'Crumb'"
        >
            <template v-slot:opposite>
                <CreatedAListItem :timestamp="item.createdAt" :show-icon="false"/>
            </template>

            <template v-slot:icon>
                <CrumbTypeIcon v-if="item.__typename === 'Crumb'" :crumb-type="item.type"/>
                <v-icon v-else-if="item.__typename === 'Tag'">label</v-icon>
                <v-icon v-else @click="goToLinked(item)">link</v-icon>
            </template>

            <v-card>
                <v-container>
                    <CrumbSummary v-if="item.__typename === 'Crumb'" :id="item.id" v-on:clicked-summary="routeToFull"/>
                    <TagChip v-else-if="item.__typename === 'Tag'" :tag="item"/>
                    <span v-else>Created Link</span>
                </v-container>
            </v-card>

        </v-timeline-item>
    </v-timeline>
</template>

<script>
    import CreatedAListItem from "./CreatedAtListItem";
    import CrumbTypeIcon from "./CrumbTypeIcon";
    import CrumbSummary from "./CrumbSummary";
    import {fromId} from "@/urlids";
    import TagChip from "./TagChip";

    export default {
        name: "CrumbTimeline",
        components: {TagChip, CrumbSummary, CrumbTypeIcon, CreatedAListItem},
        props: {
            authorId: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                getCrumbsByAuthor: [],
                getTagsByAuthor: [],
                getCrumbLinksByAuthor: []
            };
        },
        computed: {
            orderedItems() {
                return this.getCrumbsByAuthor
                    .concat(this.getTagsByAuthor)
                    .concat(this.getCrumbLinksByAuthor)
                    .sort((a, b) => b.createdAt - a.createdAt);
            },
        },
        methods: {
            routeToFull(id) {
                this.$router.push({name: "crumbdetail", params: {id: fromId(id)}});
            },
            iconColor(item) {
                if (item.__typename === "Tag") return "accent";
                if (item.__typename === "CrumbLink") return "warning";
                if (item.type === "question") return "primary";
                return "secondary";
            },
            goToLinked(crumbLink) {
                this.$router.push({name: "crumbdetail", params: {id: fromId(crumbLink.links[0])}});
            }
        },
        apollo: {
            getCrumbsByAuthor: {
                query: require("../graphql/GetCrumbsByAuthor.gql"),
                variables() {
                    return {authorId: this.authorId};
                },
                client: "crumblerClient",
            },
            getTagsByAuthor: {
                query: require("../graphql/GetTagsByAuthor.gql"),
                variables() {
                    return {authorId: this.authorId};
                },
                client: "taginatorClient",
            },
            getCrumbLinksByAuthor: {
                query: require("../graphql/GetCrumbLinksByAuthor.gql"),
                variables() {
                    return {authorId: this.authorId};
                },
                client: "zeldaClient",
            },
        },
    };
</script>

<style scoped>

</style>