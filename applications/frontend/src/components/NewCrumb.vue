<template>
    <md-card>
        <md-card-header>
            <div class="md-title">New {{ crumbTypeCapitalized }}</div>
        </md-card-header>

        <md-card-content>
            <md-field>
                <label>Title</label>
                <md-input v-model="newCrumbTitle" type="text" maxlength="120" md-autogrow></md-input>
            </md-field>
            <md-field>
                <label>Text</label>
                <md-textarea v-model="newCrumbText" type="text" md-autogrow></md-textarea>
            </md-field>
            <md-field>
                <!-- Can use md-static-->
                <md-chips
                    class="md-primary pulse-on-error"
                    v-model="newCrumbTags"
                    :md-auto-insert="true"
                    md-check-duplicated
                    :md-format="formatTag"
                    placeholder="Tags as key:value"
                >
                    <label>Tags as key:value</label>
                </md-chips>
            </md-field>
        </md-card-content>

        <md-card-actions>
            <md-button @click="createCrumb" class="md-raised md-primary">Post {{ crumbType }}</md-button>
            <md-button class="md-raised md-accent" disabled>Find similar</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
import { fromId } from "@/urlids";

export default {
    name: "NewCrumb",
    props: {
        crumbType: {
            type: String,
            required: true,
        },
        linkTo: {
            required: false,
            type: [String, Number],
        },
        confirmedActionEvent: {
            type: String,
            default: "confirmed-action",
        },
    },
    computed: {
        crumbTypeCapitalized: function() {
            return this.crumbType.charAt(0).toUpperCase() + this.crumbType.slice(1);
        },
    },
    data() {
        return {
            newCrumbTitle: "",
            newCrumbText: "",
            newCrumbTags: [],
        };
    },
    methods: {
        createCrumb() {
            if (this.crumbType.toLowerCase() === "answer" && !this.linkTo) {
                console.error("Can't create answer-crumb with no link to anything!");
                return;
            }
            this.$apollo
                .mutate({
                    mutation: require("../graphql/CreateCrumb.gql"),
                    variables: {
                        title: this.newCrumbTitle,
                        text: this.newCrumbText,
                        type: this.crumbType,
                        linkTo: this.linkTo ? this.linkTo : null,
                    },
                    client: "crumblerClient",
                })
                .then((data) => {
                    console.log("New crumb created with id", data.data.createCrumb.id);
                    if (this.crumbType.toLowerCase() === "question")
                        this.$router.push({ name: "crumbdetail", params: { id: fromId(data.data.createCrumb.id) } });
                });
            this.$emit(this.confirmedActionEvent);
        },
        formatTag(str) {
            /*
             * Turns arbitrary strings into "clean" tags
             * "  hello YOU :   friend" -> "hello_you:friend"
             * "whatsup" -> "whatsup:true"
             */
            let tagKV = str
                .replace(/,/g, "")
                .split(":")
                .map((kv) => {
                    return kv
                        .trim()
                        .toLowerCase()
                        .split(" ")
                        .filter((s) => s)
                        .join("_");
                })
                .filter((s) => s);
            let tags = tagKV.join(":");
            if (tags.length === 0) return "";
            else if (tags.indexOf(":") === -1) return tags + ":true";
            else return tags;
        },
    },
};
</script>
