<template>
    <v-container class="secondary">
        <span>{{ getTagsByIds.length }} Tags:</span>
        <v-chip v-for="tag in getTagsByIds" :key="tag.id" :color="colorForId(tag.id)">
            {{ tag.name }}:{{ tag.value }}
        </v-chip>
    </v-container>
</template>

<script>
    export default {
        name: "Tags",
        props: {
            tagIds: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                getTagsByIds: [],
                colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            };
        },
        methods: {
            colorForId(id) {
                return this.colors[id % this.colors.length];
            },
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
