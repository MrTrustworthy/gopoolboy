<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Post an answer</div>
        </md-card-header>
        <md-card-content>
            <md-field>
                <label>Answer</label>
                <md-input v-model="newAnswerText" type="text"></md-input>
            </md-field>
        </md-card-content>

        <md-card-actions>
            <md-button @click="createAnswer" class="md-raised md-primary">Post</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
import { toId } from "@/urlids";

export default {
    name: "NewAnswer",
    data() {
        return {
            newAnswerText: "",
            questionId: toId(this.$route.params.id),
        };
    },
    watch: {
        $route(to, from) {
            // eslint-disable-line no-unused-vars
            this.questionId = toId(to.params.id);
        },
    },
    methods: {
        createAnswer() {
            this.$apollo.mutate({
                mutation: require("../graphql/CreateAnswer.gql"),
                variables: {
                    questionId: this.questionId,
                    text: this.newAnswerText,
                },
            });
        },
    },
};
</script>
