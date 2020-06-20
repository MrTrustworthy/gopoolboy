<template>
    <v-list-item :to="{ name: 'profile', params: {userId: authorId}}">
        <v-list-item-icon>
            <v-icon>recent_actors</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>by {{ getUser.nickname || 'anon' }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    export default {
        name: "AuthorListItem",
        props: {
            authorId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                getUser: {}
            };
        },
        apollo: {
            getUser: {
                query: require("../graphql/GetUser.gql"),
                variables() {
                    return {
                        userId: this.authorId
                    };
                },
                client: "orgamonClient",
            },
        }
    };
</script>

<style scoped>

</style>