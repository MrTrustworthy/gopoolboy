<template>
    <v-text-field v-model="like" @keyup.enter="pressEnter" dense single-line placeholder="Search"
                  outlined>
        <v-icon slot="prepend">search</v-icon>
    </v-text-field>
</template>

<script>

    export default {
        name: "SearchBar",
        props: {
            crumbType: {
                type: String,
                default: "all"
            },
            sortBy: {
                type: String,
                default: "relevance"
            }
        },
        data() {
            return {
                like: "",
                findCrumbs: [],
            };
        },
        methods: {
            pressEnter() {
                this.$emit("submit");
            }
        },
        watch: {
            like: function (newVal) {
                this.$emit("typed-like", newVal);
            }
        },
        apollo: {
            findCrumbs: {
                query: require("../graphql/FindCrumbs.gql"),
                variables() {
                    return {
                        type: this.crumbType,
                        like: this.like,
                        sortBy: this.sortBy,
                    };
                },
                fetchPolicy: "no-cache", // disable cache so navigating back will reload it
                client: "findrClient",
                result: function (result, key) {
                    const ids = result.data[key].map(found => found.id);
                    this.$emit("found-ids", ids);
                }
            },
        },
    };
</script>