<template>
    <div class="question-overview">
        <h1>Question {{ $route.params.id }}</h1>
        <div v-if="$apollo.queries.getQuestion.loading" class="loading apollo">Loading...</div>
        <div class="question-box">
            <h3>{{ getQuestion.title }}</h3>
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
                question: {},
                getQuestion: {},
                question_id: this.$route.params.id
            }
        },
        watch: {
            $route(to, from) { // eslint-disable-line no-unused-vars
                this.question_id = to.params.id
            }
        },
        apollo: {
            getQuestion: {
                // gql query
                query: require('../graphql/QuestionDetail.gql'),
                // Static parameters
                variables() {
                    return {
                        question_id: this.question_id
                    }
                },
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
