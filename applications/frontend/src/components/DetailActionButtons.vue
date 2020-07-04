<template>
    <v-container>
        <v-list dense class="secondary">
            <v-row>
                <v-col :cols="colWidth">
                    <AuthorListItem :author-id="sourceObject.authorId"/>
                </v-col>

                <v-col :cols="colWidth">
                    <CreatedAtListItem :timestamp="sourceObject.createdAt"/>
                </v-col>
                <v-col :cols="colWidth" v-if="showAddLink">
                    <AddLinkListItem :crumb-id="sourceObject.id"/>
                </v-col>
            </v-row>
        </v-list>
    </v-container>
</template>

<script>
    import AuthorListItem from "./AuthorListItem";
    import CreatedAtListItem from "./CreatedAtListItem";
    import AddLinkListItem from "./AddLinkListItem";

    export default {
        name: "DetailActionButtons",
        components: {AddLinkListItem, CreatedAtListItem, AuthorListItem},
        props: {
            showAddLink: {
                type: Boolean,
                required: true
            },
            sourceObject: {
                type: Object,
                required: true
            }
        },
        computed: {
            colWidth() {
                return this.showAddLink ? 4 : 6;
            }
        }

    };
</script>

<style scoped>

</style>