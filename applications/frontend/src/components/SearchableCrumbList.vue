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

        <CrumbSummary v-for="found of findCrumbs" :key="found.id" v-bind:id="found.id" />
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
        };
    },
    apollo: {
        findCrumbs: {
            query: require("../graphql/FindCrumbs.gql"),
            variables() {
                return {
                    type: this.crumbType,
                    like: this.like,
                };
            },
            client: "findrClient",
        },
    },
};
</script>
