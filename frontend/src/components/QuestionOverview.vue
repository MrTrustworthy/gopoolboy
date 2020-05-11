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

                    <p>There's a total of {{ data.getQuestions.length }} Questions in your organization</p>

                    <div
                            v-for="question of data.getQuestions"
                            :key="question.id"
                            class="message"
                    >

                        <router-link v-bind:to="'/q/' + question.id">{{ question.title }}</router-link>
                        : {{ question.answerCount }} Answer{{ question.answerCount !== 1 ? "s" : "" }}
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
