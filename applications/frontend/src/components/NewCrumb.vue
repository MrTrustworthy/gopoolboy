<template>
    <v-card shaped>
        <v-container fluid>
            <v-card-title>
                New {{ crumbTypeCapitalized }}
            </v-card-title>
            <v-form ref="form">
                <v-text-field v-model="newCrumbTitle" :counter="120" label="Title" required></v-text-field>
                <v-textarea v-model="newCrumbText" label="Text" outlined></v-textarea>
                <TagInput v-on:new-tags="(tagIds) => newCrumbTagIds = tagIds"/>
                <v-btn @click="createCrumb">Post {{ crumbType }}</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import {fromId} from "@/urlids";
    import TagInput from "./TagInput";

    export default {
        name: "NewCrumb",
        components: {TagInput},
        props: {
            crumbType: {
                type: String,
                required: true,
            },
            linkTo: {
                required: false,
                type: [String, Number],
            },
        },
        computed: {
            crumbTypeCapitalized: function () {
                return this.crumbType.charAt(0).toUpperCase() + this.crumbType.slice(1);
            },
        },
        data() {
            return {
                newCrumbTitle: "",
                newCrumbText: "",
                newCrumbTagIds: []
            };
        },
        methods: {
            async createCrumb() {
                if (this.crumbType.toLowerCase() === "answer" && !this.linkTo) {
                    this.$store.commit("addPendingNotification", "Can't create answer-crumb with no link to anything!");
                    return;
                }

                const newCrumbData = this.parseNewCrumbData();
                if (!newCrumbData) return;

                const data = await this.$apollo
                    .mutate({
                        mutation: require("../graphql/CreateCrumb.gql"),
                        variables: {
                            title: newCrumbData.title,
                            text: newCrumbData.text,
                            type: this.crumbType,
                            tags: newCrumbData.tagIds,
                        },
                        refetchQueries: ["GetLinkedCrumbIds"], // not needed if !this.linkTo
                        client: "crumblerClient",
                    });
                let crumbId = data.data.createCrumb.id;

                if (!this.linkTo) {
                    await this.$router.push({name: "crumbdetail", params: {id: fromId(crumbId)}});
                    return;
                }
                await this.$apollo
                    .mutate({
                        mutation: require("../graphql/CreateCrumbLink.gql"),
                        variables: {
                            fromId: this.linkTo,
                            toId: crumbId,
                        },
                        refetchQueries: ["GetLinkedCrumbIds"],
                        client: "zeldaClient",
                    });
            },
            parseNewCrumbData() {
                if (!this.newCrumbTitle || !this.newCrumbText) {
                    this.$store.commit("addPendingNotification", "Can't create crumb without text or title");
                    return;
                }
                const title = this.newCrumbTitle;
                const text = this.newCrumbText;
                this.newCrumbTitle = "";
                this.newCrumbText = "";
                return {tagIds: this.newCrumbTagIds, title, text};
            },

        },
    };
</script>
