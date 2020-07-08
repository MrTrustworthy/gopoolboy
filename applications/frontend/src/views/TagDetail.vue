<template>

    <div>
        <v-skeleton-loader v-if="$apollo.queries.getTagsByIds.loading" type="list-item-avatar-two-line"/>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getTagsByIds.error">
            An error occured :(
        </div>

        <div v-else>
            <TagSummaryListItem :tag="tag"/>
            <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="routeToFull"/>
        </div>
    </div>


</template>

<script>
    import {decodeId, encodeId} from "@/urlids";
    import CrumbList from "../components/CrumbList";
    import TagSummaryListItem from "../components/TagSummaryListItem";

    export default {
        name: "TagDetail",
        components: {TagSummaryListItem, CrumbList},
        data() {
            return {
                getTagsByIds: [],
                getCrumbsWithTag: [],
                tagId: decodeId(this.$route.params.id)
            };
        },
        computed: {
            tag() {
                return this.getTagsByIds && this.getTagsByIds.length > 0 ? this.getTagsByIds[0] : {};
            },
            crumbIds() {
                return this.getCrumbsWithTag.map(el => el.id);
            }
        },
        watch: {
            $route(to) {
                this.tagId = decodeId(to.params.id);
            },
        },
        methods: {
            routeToFull(id) {
                this.$router.push({name: "crumbdetail", params: {id: encodeId(id)}});
            }
        },
        apollo: {
            getTagsByIds: {
                query: require("../graphql/GetTagsByIds.gql"),
                variables() {
                    return {
                        ids: [this.tagId]
                    };
                },
                client: "taginatorClient",
            },
            getCrumbsWithTag: {
                query: require("../graphql/GetCrumbsWithTag.gql"),
                client: "crumblerClient",
                variables() {
                    return {
                        tag: this.tagId
                    };
                }
            },
        },
    };
</script>