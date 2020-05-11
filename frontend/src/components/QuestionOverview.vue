<template>
    <div class="question-overview">
        <h2>Most recent questions</h2>


        <div v-if="$apollo.queries.getQuestions.loading" class="loading apollo">
            Loading...
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getQuestions.error" class="error apollo">
            An error occured
        </div>

        <div v-else-if="getQuestions">

            <p>There's a total of {{ getQuestions.length }} Questions in your organization</p>

            <div
                    v-for="question of getQuestions"
                    :key="question.id"
                    class="message"
            >
                <router-link v-bind:to="'/q/' + question.id">{{ question.title }}</router-link>
                : {{ question.answerCount }} Answer{{ question.answerCount !== 1 ? "s" : "" }}
            </div>
        </div>

        <div v-else>
            Something went wrong :(
        </div>

    </div>
</template>

<script>
    export default {
        name: 'QuestionOverview',
        data() {
            return {
                getQuestions: []
            }
        },
        apollo: {
            getQuestions: {
                query: require('../graphql/QuestionOverview.gql'),
            },
        }
    }
</script>
