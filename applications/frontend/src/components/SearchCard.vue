<template>
    <v-card shaped class="elevation-1">
        <v-card-text>
            <SearchBar :sort-by="sortBy" :crumb-type="crumbType" v-on:found-ids="updateIds"/>
            <div>
                Found a total of {{ crumbIds.length }} {{ objectDescriptor }} {{ outputSuffix }}
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <span>types:</span>
            <v-radio-group v-model="crumbType" row>
                <v-radio value="all" label="All"></v-radio>
                <v-radio value="question" label="Question"></v-radio>
                <v-radio value="answer" label="Answer"></v-radio>
            </v-radio-group>
        </v-card-actions>
        <v-card-actions>
            <span>sort by:</span>
            <v-radio-group v-model="sortBy" row>
                <v-radio value="relevance" label="Relevance"></v-radio>
                <v-radio value="votes" label="Votes"></v-radio>
                <v-radio value="createdAt" label="Date"></v-radio>
            </v-radio-group>
        </v-card-actions>
    </v-card>
</template>

<script>

    import SearchBar from "./SearchBar";

    export default {
        name: "SearchCard",
        components: {SearchBar},
        props: {
          defaultCrumbType: {
              type: String,
              default: "question"
          }
        },
        data() {
            return {
                sortBy: "relevance",
                crumbType: this.defaultCrumbType,
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
