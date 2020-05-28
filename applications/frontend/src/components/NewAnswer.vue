<template>
    <div>
        <h3>Post an answer</h3>

        <div>
            <input v-model="newAnswerText" type="text" placeholder="Text" />
            <button @click="createAnswer">Post</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewAnswer",
    data() {
        return {
            newAnswerText: "",
            questionId: this.$route.params.id,
        };
    },
    watch: {
        $route(to, from) {
            // eslint-disable-line no-unused-vars
            this.questionId = to.params.id;
        },
    },
    methods: {
        createAnswer() {
            this.$apollo.mutate({
                mutation: require("../graphql/CreateAnswer.gql"),
                variables: {
                    questionId: this.questionId,
                    text: this.newAnswerText,
                },
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

.answer-box {
    background-color: burlywood;
}
</style>
