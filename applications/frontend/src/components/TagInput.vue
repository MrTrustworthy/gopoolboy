<template>
    <v-container fluid>
        <v-combobox
                v-model="model"
                :filter="filter"
                :hide-no-data="!search"
                :items="allTags"
                item-value="id"
                :search-input.sync="search"
                v-on:change="newTagEntered"
                :loading="isLoading"
                hide-selected
                label="Search for tags"
                multiple
                small-chips
                solo
        >
            <template v-slot:no-data>
                <v-list-item>
                    <span class="subheading">Create</span>
                    <v-chip label small :color="colorForId(0)">
                        {{ search }}
                    </v-chip>
                </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        :color="colorForId(item.id)"
                        label
                        small
                >
                    <span>{{ item.name }}:{{ item.value }}</span>
                    <v-icon small @click="parent.selectItem(item)">close</v-icon>
                </v-chip>
            </template>
            <template v-slot:item="{ item }">
                <v-chip dark label small :color="colorForId(item.id)"> {{ item.name }}:{{ item.value }}</v-chip>
                <v-spacer></v-spacer>
            </template>
        </v-combobox>
    </v-container>
</template>

<script>
    export default {
        name: "TagInput",
        data: () => ({
            getAllTags: [],
            waitingForTags: 0,
            colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            model: [],
            search: null,
        }),
        computed: {
            allTags() {
                return [
                    {header: 'Select an tag or create one'},
                    ...this.getAllTags
                ];
            },
            isLoading() {
                return this.waitingForTags > 0;
            },
            tagIds() {
                return this.model.map(tag => tag.id);
            }
        },
        watch: {
            search(newSearch) {
                if (newSearch) this.search = newSearch.replace(/ /g, "").toLowerCase();
            }
        },
        methods: {
            newTagEntered(tags) {
                // filter out all "new custom" tags (which are strings) and handle them async
                tags = tags.map(tag => {
                    if (typeof tag !== "string") return tag;
                    this.createNewTag(tag);
                    this.waitingForTags++;
                    return null;
                }).filter(e => e !== null);
                this.model = tags;
                this.$emit("new-tags", this.tagIds);
            },
            async createNewTag(tagString) {
                const newTag = this.parseTag(tagString);
                const result = await this.$apollo
                    .mutate({
                        mutation: require("../graphql/CreateTag.gql"),
                        variables: {
                            tagInput: {
                                name: newTag.name,
                                value: newTag.value
                            }
                        },
                        client: "taginatorClient"
                    });
                this.waitingForTags--;
                this.model.push(result.data.createTag);
                this.$emit("new-tags", this.tagIds);
                await this.$apollo.queries.getAllTags.refetch();
            },
            parseTag(str) {
                /***
                 * validates and formats a string tag, returning "null" if its not verifiable
                 * "hello:you:friend" => {name: 'hello', 'value': 'youfriend'}
                 * "whatsup" -> "{name: 'whatsup', value: 'yes'}"
                 */
                if (!str) return null;
                let split = str.replace(/ /g, "").toLowerCase().split(":");
                return {
                    name: split[0],
                    value: split.slice(1).join("") || "yes"
                };
            },
            colorForId(id) {
                return this.colors[id % this.colors.length];
            },
            filter(item, queryText) {
                if (item.header) return false;
                const itemText = `${item.name}:${item.value}`;
                return itemText.includes(queryText.toLowerCase());
            },
        },
        apollo: {
            getAllTags: {
                query: require("../graphql/GetAllTags.gql"),
                client: "taginatorClient",
            },
        },
    };
</script>

<style scoped>

</style>