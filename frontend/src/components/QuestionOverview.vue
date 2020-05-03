<template>
    <div class="question-overview">
        <h1>{{ msg }}</h1>

        <ApolloQuery
                :query="require('../graphql/QuestionOverview.gql')"
        >
            <template slot-scope="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <div v-else-if="data" class="result apollo">

                    <p>There's a total of {{ data.allQuestions.length }} Questions in your organization</p>

                    <div
                            v-for="question of data.allQuestions"
                            :key="question.title"
                            class="message"
                    >
                        {{ question.title }} : {{ question.answerSet.length }} Answer{{ question.answerSet.length !== 1
                        ? "s" : "" }}
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
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
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
