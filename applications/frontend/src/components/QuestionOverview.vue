<template>
    <div>
        <h3>Most recent questions</h3>

        <div v-if="$apollo.queries.getQuestions.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getQuestions.error">
            An error occured :(
        </div>

        <div v-else>
            <p>There's a total of {{ getQuestions.length }} Questions in your organization</p>
            <md-list>
                <md-list-item v-for="question of getQuestions" :key="question.id">
                    <md-button v-bind:to="'/q/' + question.id">{{ question.title }}</md-button>
                    <md-badge
                        v-bind:class="question.answers.length !== 0 ? 'md-primary' : 'md-accent'"
                        v-bind:md-content="question.answers.length"
                    />
                </md-list-item>
            </md-list>
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
