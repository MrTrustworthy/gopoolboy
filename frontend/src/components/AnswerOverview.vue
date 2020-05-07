<template>
    <div>
        <div
                v-for="answer of getAnswers"
                :key="answer.id"
                class="answer-box"
        >
            A: {{ answer.text }} [{{ answer.votes }} Votes]
        </div>


    </div>
</template>

<script>
    export default {
        name: 'AnswerOverview',
        data() {
            return {
                getAnswers: {},
                question_id: this.$route.params.id
            }
        },
        watch: {
            $route(to, from) { // eslint-disable-line no-unused-vars
                this.question_id = to.params.id
            }
        },
        apollo: {
            getAnswers: {
                // gql query
                query: require('../graphql/AnswerOverview.gql'),
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
    .answer-box {
        background-color: aliceblue;
        padding: 5px;
        margin: 5px;
    }

</style>
