<template>
    <v-timeline>
        <v-timeline-item
                v-for="item in orderedItems"
                :key="item.__typename + item.id"
                large
                :color="iconColor(item)"
        >
            <template v-slot:opposite>
                <CreatedAListItem :timestamp="item.createdAt" :show-icon="false"/>
            </template>

            <template v-slot:icon>
                <CrumbTypeIcon v-if="item.__typename === 'Crumb'" :crumb-type="item.type"/>
                <v-icon v-else>label</v-icon>
            </template>

            <v-card>
                <CrumbSummary v-if="item.__typename === 'Crumb'" :id="item.id" v-on:clicked-summary="routeToFull"/>
                <TagChip v-else :tag="item"/>
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
                getTagsByAuthor: []
            };
        },
        computed: {
            orderedItems() {
                return this.getCrumbsByAuthor
                    .concat(this.getTagsByAuthor)
                    .sort((a, b) => b.createdAt - a.createdAt);
            }
        },
        methods: {
            routeToFull(id) {
                this.$router.push({name: "crumbdetail", params: {id: fromId(id)}});
            },
            iconColor(item) {
                if (item.__typename === "Tag") return "accent"
                if (item.type === "question") return "primary"
                return "secondary"
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
        },
    };
</script>

<style scoped>

</style>