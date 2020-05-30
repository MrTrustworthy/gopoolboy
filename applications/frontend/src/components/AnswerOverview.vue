<template>
    <div>
        <p v-for="answer of getAnswers" :key="answer.id" class="answer-box">
            A: {{ answer.text }} [{{ answer.votes }} Votes]
            <button @click="() => upvoteAnswer(answer.id)">Upvote</button>
        </p>
    </div>
</template>

<script>
export default {
    name: "AnswerOverview",
    data() {
        return {
            getAnswers: {},
            questionId: this.$route.params.id,
        };
    },
    watch: {
        $route(to) {
            this.questionId = to.params.id;
        },
    },
    apollo: {
        getAnswers: {
            query: require("../graphql/AnswerOverview.gql"),
            variables() {
                return {
                    questionId: this.questionId,
                };
            },
        },
    },
    methods: {
        upvoteAnswer(answerId) {
            this.$apollo.mutate({
                mutation: require("../graphql/UpvoteAnswer.gql"),
                variables: { answerId },
            });
        },
    },
};
</script>
