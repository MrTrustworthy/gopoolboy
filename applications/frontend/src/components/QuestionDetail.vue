<template>
    <div>
        <h1>Question {{ $route.params.id }}</h1>
        <div v-if="$apollo.queries.getQuestion.loading" class="loading apollo">Loading...</div>
        <div>
            <h3>{{ getQuestion.title }} ({{ getQuestion.votes }} votes)</h3>
            <button @click="upvoteQuestion">Upvote</button>
            <p>{{ getQuestion.text }}</p>
        </div>
        <br />
    </div>
</template>

<script>
export default {
    name: "QuestionDetail",
    data() {
        return {
            getQuestion: {},
            questionId: this.$route.params.id,
        };
    },
    watch: {
        $route(to) {
            this.questionId = to.params.id;
        },
    },
    apollo: {
        getQuestion: {
            query: require("../graphql/QuestionDetail.gql"),
            variables() {
                return {
                    questionId: this.questionId,
                };
            },
        },
    },
    methods: {
        upvoteQuestion() {
            this.$apollo.mutate({
                mutation: require("../graphql/UpvoteQuestion.gql"),
                variables: {
                    questionId: this.questionId,
                },
                optimisticResponse: {
                    __typename: "Mutation",
                    upvoteQuestion: {
                        __typename: "Question",
                        id: this.questionId,
                        votes: this.getQuestion.votes + 1,
                    },
                },
            });
        },
    },
};
</script>
