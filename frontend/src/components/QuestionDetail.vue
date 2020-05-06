<template>
    <div class="question-overview">
        <h1>Question {{ $route.params.id }}</h1>


        <div v-if="$apollo.queries.question.loading" class="loading apollo">Loading...</div>

        <div class="question-box">
            <h3>{{ question.title }}</h3>
            <p>{{ question.text }}</p>
        </div>
        <br>

        <div
                v-for="answer of question.answerSet"
                :key="answer.id"
                class="answer-box"
        >
            A: {{ answer.text }} [{{ answer.votes }} Votes]
        </div>


    </div>
</template>

<script>
    export default {
        name: 'QuestionOverview',
        data() {
            return {
                question: {},
                question_id: this.$route.params.id
            }
        },
        watch: {
            $route(to, from) { // eslint-disable-line no-unused-vars
                this.question_id = to.params.id
            }
        },
        apollo: {
            question: {
                // gql query
                query: require('../graphql/QuestionDetail.gql'),
                // Static parameters
                variables() {
                    return {
                        question_id: this.question_id
                    }
                }
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

    .answer-box {
        background-color: antiquewhite;
        padding: 5px;
        margin: 5px;
    }

</style>
