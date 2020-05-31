<template>
    <div>
        <div v-if="$apollo.queries.getQuestion.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getQuestion.error">
            An error occured :(
        </div>

        <div v-else>
            <md-list>
                <md-list-item>
                    <md-button v-bind:to="'/q/' + fromId(getQuestion.id)">{{ getQuestion.title }}</md-button>
                    <md-badge
                        v-bind:class="getQuestion.answers.length !== 0 ? 'md-primary' : 'md-accent'"
                        v-bind:md-content="getQuestion.answers.length"
                    />
                </md-list-item>
            </md-list>
        </div>
    </div>
</template>

<script>
import { fromId } from "@/urlids";

export default {
    name: "QuestionOverviewWidget",
    props: {
        questionId: String,
    },
    data() {
        return {
            getQuestion: {},
            fromId: fromId,
        };
    },
    apollo: {
        getQuestion: {
            query: require("../graphql/QuestionDetail.gql"),
            variables() {
                return { questionId: this.questionId };
            },
        },
    },
};
</script>
