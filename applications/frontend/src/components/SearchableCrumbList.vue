<template>
    <div>
        <md-field>
            <md-input v-model="like"></md-input>
            <span class="md-helper-text">Search</span>
        </md-field>
        <p>
            There's a total of {{ findCrumbs.length }} Crumbs of type "{{ crumbType }}"
            {{ like === "" ? "in your organization" : "for your search" }}
        </p>

        <p>sort by</p>
        <md-radio v-model="sortBy" value="votes">Votes</md-radio>
        <md-radio v-model="sortBy" value="date">Date</md-radio>

        <CrumbSummary v-for="found of findCrumbs" :key="found.id" v-bind:id="found.id"/>
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
