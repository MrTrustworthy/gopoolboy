<template>
    <div>
        <h3>Ask a Question</h3>

        <div>
            <input v-model="newQuestionTitle" type="text" placeholder="Title" />
            <input v-model="newQuestionText" type="text" placeholder="Text" />
            <button @click="createQuestion">Ask</button>
        </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

.question-box {
    background-color: burlywood;
}
</style>
