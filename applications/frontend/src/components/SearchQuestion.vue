<template>
    <div>
        <md-field>
            <md-input v-model="like"></md-input>
            <span class="md-helper-text">Search</span>
        </md-field>
        <p>
            There's a total of {{ findQuestions.length }} Questions
            {{ like === "" ? "in your organization" : "for your search" }}
        </p>

        <QuestionOverviewWidget
            v-for="found of findQuestions"
            :key="found.questionId"
            v-bind:questionId="found.questionId"
        />
    </div>
</template>

<script>
import QuestionOverviewWidget from "@/components/QuestionOverviewWidget.vue";

export default {
    name: "SearchQuestion",
    components: {
        QuestionOverviewWidget,
    },
    data() {
        return {
            like: "",
            findQuestions: [],
        };
    },
    apollo: {
        findQuestions: {
            query: require("../graphql/FindQuestions.gql"),
            variables() {
                return {
                    like: this.like,
                };
            },
            client: "findrClient",
        },
    },
};
</script>
