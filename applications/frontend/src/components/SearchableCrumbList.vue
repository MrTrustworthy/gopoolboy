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
                <md-radio v-model="sortBy" value="votes">Votes</md-radio>
                <md-radio v-model="sortBy" value="date">Date</md-radio>
            </md-card-actions>
        </md-card>

        <md-list class="md-double-line md-dense">
            <template v-for="found of findCrumbs">

                <CrumbSummary :key="found.id" v-bind:id="found.id"/>
                <md-divider class="md-inset" :key="found.id + '_inset'"></md-divider>
            </template>
        </md-list>
    </div>
</template>

<script>
    import CrumbSummary from "@/components/CrumbSummary.vue";

    export default {
        name: "SearchableCrumbList",
        props: {
            crumbType: String,
        },
        components: {
            CrumbSummary,
        },
        data() {
            return {
                like: "",
                findCrumbs: [],
                sortBy: "votes",
            };
        },
        computed: {
          outputSuffix(){
              return this.like === "" ? "in your organization" : "for your search"
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
                client: "findrClient",
            },
        },
    };
</script>
