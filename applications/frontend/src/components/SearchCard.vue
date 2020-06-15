<template>
    <div>
        <md-card>
            <md-card-content>
                <SearchBar :sort-by="sortBy" :crumb-type="crumbType" v-on:found-ids="updateIds"/>
                <div>
                    Found a total of {{ crumbIds.length }} {{ objectDescriptor }} {{ outputSuffix }}
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

    import SearchBar from "./SearchBar";

    export default {
        name: "SearchCard",
        components: {SearchBar},
        data() {
            return {
                sortBy: "relevance",
                crumbType: "all",
                crumbIds: []
            };
        },
        computed: {
            outputSuffix() {
                return this.like === "" ? "in your organization" : "for your search";
            },
            objectDescriptor() {
                const plural = this.crumbIds.length !== 1 ? "s" : "";
                let type = this.crumbType.charAt(0).toUpperCase() + this.crumbType.slice(1);
                if (this.crumbType === "all") type = "Crumb";
                return type + plural;
            },
        },
        methods: {
            updateIds(ids) {
                this.crumbIds = ids;
                this.$emit("found-ids", ids);
            }
        }
    };
</script>
