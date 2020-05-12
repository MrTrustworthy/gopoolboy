<template>
    <div class="question-overview">
        <h1>Question {{ $route.params.id }}</h1>
        <div v-if="$apollo.queries.getQuestion.loading" class="loading apollo">Loading...</div>
        <div class="question-box">
            <h3>{{ getQuestion.title }} ({{ getQuestion.votes }} votes)</h3>
            <button @click="upvoteQuestion">Upvote</button>
            <p>{{ getQuestion.text }}</p>
        </div>
        <br>


    </div>
</template>

<script>
    export default {
        name: 'QuestionDetail',
        data() {
            return {
                getQuestion: {},
                questionId: this.$route.params.id
            }
        },
        watch: {
            $route(to, from) { // eslint-disable-line no-unused-vars
                this.questionId = to.params.id
            }
        },
        apollo: {
            getQuestion: {
                query: require('../graphql/QuestionDetail.gql'),
                variables() {
                    return {
                        questionId: this.questionId
                    }
                },
            }
        },
        methods: {
            upvoteQuestion() {
                this.$apollo.mutate({
                    mutation: require('../graphql/UpvoteQuestion.gql'),
                    variables: {
                        questionId: this.questionId
                    },
                    update: (store, {data: {value}}) => {
                        console.log("data", store, "vals", value)
                    },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        upvoteQuestion: {
                            __typename: 'Question',
                            id: this.questionId,
                            votes: this.getQuestion.votes + 1
                        },

                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    .question-box {
        background-color: bisque;
    }
</style>
