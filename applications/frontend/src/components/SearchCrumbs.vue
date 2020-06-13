<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">Search</div>
            </md-card-header>

            <md-card-content>
                <md-field>
                    <md-input v-model="like"></md-input>
                    <span class="md-helper-text">Search</span>
                </md-field>
                <div>
                    Found a total of {{ findCrumbs.length }} {{ crumbType }}s {{ outputSuffix }}
                </div>
            </md-card-content>
            <md-card-actions>
                <div class="md-subheader">sort by</div>
                <md-radio v-model="sortBy" value="relevance">Relevance</md-radio>
                <md-radio v-model="sortBy" value="votes">Votes</md-radio>
                <md-radio v-model="sortBy" value="createdAt">Date</md-radio>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>

    export default {
        name: "SearchCrumb",
        props: {
            crumbType: String,
        },
        data() {
            return {
                like: "",
                findCrumbs: [],
                sortBy: "relevance",
            };
        },
        computed: {
            crumbIds() {
                return this.findCrumbs.map(c => c.id);
            },
            outputSuffix() {
                return this.like === "" ? "in your organization" : "for your search";
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
