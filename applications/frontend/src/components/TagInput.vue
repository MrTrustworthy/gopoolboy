<template>

    <v-combobox
            v-model="tags"
            :items="tagAutocompletes"
            v-on:input="updateTags"
            :search-input.sync="search"
            label="Tags as key:value"
            multiple
            chips
            clearable
    >
        <template v-slot:selection="data">
            <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
            >
                <v-avatar class="accent white--text" left v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
            </v-chip>
        </template>


        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-combobox>

</template>

<script>
    export default {
        name: "TagInput",
        data() {
            return {
                tags: [],
                getAllTags: [],
                search: null
            };
        },
        computed: {
            tagAutocompletes() {
                return this.getAllTags.map(tag => `${tag.key}:${tag.value}`);
            }
        },
        watch: {
            search(newSearch) {
                if (newSearch) this.search = newSearch.replace(/ /g, "").toLowerCase();
            }
        },
        methods: {
            parseTag(str) {
                /***
                 * validates and formats a string tag, returning "null" if its not verifiable
                 * "hello:you:friend" => {key: 'hello', 'value': 'youfriend'}
                 * "whatsup" -> "{key: 'whatsup', value: 'yes'}"
                 */
                if (!str) return null;
                let split = str.split(":");
                return {
                    key: split[0],
                    value: split.slice(1).join("") || "yes"
                };
            },
            updateTags(newTags) {
                const tagData = newTags.map(this.parseTag).filter(x => x);
                this.tags = tagData.map(tag => `${tag.key}:${tag.value}`);
                this.$emit("new-tags", tagData);
            }
        },
        apollo: {
            getAllTags: {
                query: require("../graphql/GetAllTags.gql"),
                client: "crumblerClient",
            },
        },
    };
</script>

<style scoped>

</style>