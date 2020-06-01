<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Ask a Question</div>
        </md-card-header>

        <md-card-content>
            <md-field>
                <label>Title</label>
                <md-input v-model="newQuestionTitle" type="text"></md-input>
            </md-field>
            <md-field>
                <label>Text</label>
                <md-input v-model="newQuestionText" type="text"></md-input>
            </md-field>
            <md-field>
                <!-- Can use md-static-->
                <md-chips
                    class="md-primary pulse-on-error"
                    v-model="newQuestionTags"
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
            <md-button @click="createCrumb" class="md-raised md-primary">Ask</md-button>
            <md-button class="md-raised md-accent" disabled>Find similar</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
    name: "NewQuestion",
    data() {
        return {
            newQuestionTitle: "",
            newQuestionText: "",
            newQuestionTags: [],
        };
    },
    methods: {
        createCrumb() {
            this.$apollo
                .mutate({
                    mutation: require("../graphql/CreateCrumb.gql"),
                    variables: {
                        title: this.newQuestionTitle,
                        text: this.newQuestionText,
                        type: "question",
                    },
                    client: "crumblerClient",
                })
                .then((data) => this.$router.push({ name: "detail", params: { id: data.data.createCrumb.id } }));
        },
        formatTag(str) {
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
