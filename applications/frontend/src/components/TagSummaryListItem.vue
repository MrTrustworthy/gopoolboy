<template>

    <div>
        <v-skeleton-loader v-if="$apollo.queries.getCrumbsWithTag.loading" type="list-item-avatar-two-line"/>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumbsWithTag.error">
            An error occured :(
        </div>

        <v-list-item v-else class="elevation-1">
            <v-list-item-icon>
                <TagChip :tag="tag"/>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ getCrumbsWithTag.length }} Crumbs</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <AuthorListItem :author-id="tag.authorId"/>
            </v-list-item-action>

        </v-list-item>
    </div>
</template>

<script>
    import AuthorListItem from "./AuthorListItem";
    import TagChip from "./TagChip";

    export default {
        name: "TagSummaryListItem",
        components: {TagChip, AuthorListItem},
        props: {
            tag: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                getCrumbsWithTag: [],
            };
        },
        apollo: {
            getCrumbsWithTag: {
                query: require("../graphql/GetCrumbsWithTag.gql"),
                client: "crumblerClient",
                variables() {
                    return {
                        tag: this.tag.id
                    };
                }
            },
        },
    };
</script>

<style scoped>

</style>