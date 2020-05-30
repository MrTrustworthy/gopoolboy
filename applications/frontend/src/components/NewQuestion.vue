<template>
    <div>
        <h3>Ask a Question</h3>
        <md-field>
            <label>Title</label>
            <md-input v-model="newQuestionTitle" type="text"></md-input>
        </md-field>
        <md-field>
            <label>Text</label>
            <md-input v-model="newQuestionText" type="text"></md-input>
        </md-field>
        <md-button @click="createQuestion" class="md-raised md-primary">Ask</md-button>
        <md-button class="md-raised md-accent" disabled>Find similar</md-button>
    </div>
</template>

<script>
export default {
    name: "NewQuestion",
    data() {
        return {
            newQuestionTitle: "",
            newQuestionText: "",
        };
    },
    methods: {
        createQuestion() {
            this.$apollo
                .mutate({
                    mutation: require("../graphql/CreateQuestion.gql"),
                    variables: {
                        title: this.newQuestionTitle,
                        text: this.newQuestionText,
                    },
                })
                .then((data) => this.$router.push({ name: "detail", params: { id: data.data.createQuestion.id } }));
        },
    },
};
</script>
