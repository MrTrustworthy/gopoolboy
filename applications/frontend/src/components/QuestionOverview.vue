<template>
    <div>
        <h2>Most recent questions</h2>

        <div v-if="$apollo.queries.getQuestions.loading">
            Loading...
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getQuestions.error">
            An error occured
        </div>

        <div v-else-if="getQuestions">
            <p>There's a total of {{ getQuestions.length }} Questions in your organization</p>

            <div v-for="question of getQuestions" :key="question.id">
                <router-link v-bind:to="'/q/' + question.id">{{ question.title }}</router-link>
                : {{ question.answers.length }} Answer{{ question.answers.length !== 1 ? "s" : "" }}
            </div>
        </div>

        <div v-else>
            Something went wrong :(
        </div>
    </div>
</template>

<script>
export default {
    name: "QuestionOverview",
    data() {
        return {
            getQuestions: [],
        };
    },
    apollo: {
        getQuestions: {
            query: require("../graphql/QuestionOverview.gql"),
        },
    },
};
</script>
