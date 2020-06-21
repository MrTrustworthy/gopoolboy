<template>
    <v-list>
        <TagSummaryListItem v-for="tag in getAllTags" :key="tag.id" :tag="tag"/>
    </v-list>
</template>

<script>
    import TagSummaryListItem from "../components/TagSummaryListItem";

    export default {
        name: "TagOverview",
        components: {TagSummaryListItem},
        data() {
            return {
                getAllTags: []
            };
        },
        apollo: {
            getAllTags: {
                query: require("../graphql/GetAllTags.gql"),
                client: "taginatorClient",
            },
        },
    };
</script>