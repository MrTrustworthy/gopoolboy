<template>
    <div class="question-overview">
        <h1>Question {{ $route.params.id }}</h1>

        <ApolloQuery
                :query="require('../graphql/QuestionDetail.gql')"
                :variables="{ question_id }"
        >
            <template slot-scope="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <div v-else-if="data" class="result apollo">

                    <div class="question-box">
                        <h3>{{ data.question.title }}</h3>
                        <p>{{ data.question.text }}</p>
                    </div>
                    <br>

                    <div
                            v-for="answer of data.question.answerSet"
                            :key="answer.id"
                            class="answer-box"
                    >
                        A: {{ answer.text }} [{{ answer.votes }} Votes]
                    </div>
                </div>

                <div v-else class="no-result apollo">No result :(</div>

            </template>
        </ApolloQuery>


    </div>
</template>

<script>
    export default {
        name: 'QuestionOverview',
        /*props: {
            question_id: Number
        },*/
        data() {
            return {
                question_id: this.$route.params.id
            }
        },
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

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
