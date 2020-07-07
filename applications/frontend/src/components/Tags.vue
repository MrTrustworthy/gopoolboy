<template>
    <v-container class="secondary">
        <span>{{ getTagsByIds.length }} Tags:</span>
        <TagChip :tag="tag" v-for="tag in getTagsByIds" :key="tag.id"/>
    </v-container>
</template>

<script>
    import TagChip from "./TagChip";
    export default {
        name: "Tags",
        components: {TagChip},
        props: {
            tagIds: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                getTagsByIds: [],
            };
        },
        apollo: {
            getTagsByIds: {
                query: require("../graphql/GetTagsByIds.gql"),
                variables() {
                    return {ids: this.tagIds};
                },
                client: "taginatorClient",
            },
        },
    };
</script>
