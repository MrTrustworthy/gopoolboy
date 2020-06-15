<template>
    <div>
        <md-card>
            <md-card-content>
                <md-field>
                    <md-input v-model="like"></md-input>
                    <span class="md-helper-text">Search</span>
                </md-field>
                <div>
                    Found a total of {{ findCrumbs.length }} {{ objectDescriptor }} {{ outputSuffix }}
                </div>
            </md-card-content>
            <md-card-actions>
                <div class="md-subheader">types</div>
                <md-radio v-model="crumbType" value="all">All</md-radio>
                <md-radio v-model="crumbType" value="question">Question</md-radio>
                <md-radio v-model="crumbType" value="answer">Answer</md-radio>
            </md-card-actions>
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
        data() {
            return {
                like: "",
                findCrumbs: [],
                sortBy: "relevance",
                crumbType: "all"
            };
        },
        computed: {
            crumbIds() {
                return this.findCrumbs.map(c => c.id);
            },
            outputSuffix() {
                return this.like === "" ? "in your organization" : "for your search";
            },
            objectDescriptor() {
                const plural = this.findCrumbs.length !== 1 ? "s" : "";
                let type = this.crumbType.charAt(0).toUpperCase() + this.crumbType.slice(1);
                if (this.crumbType === "all") type = "Crumb";
                return type + plural;
            },
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
