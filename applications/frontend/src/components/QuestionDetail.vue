<template>
    <div>
        <h1>Question {{ $route.params.id }}</h1>
        <div v-if="$apollo.queries.getQuestion.loading" class="loading apollo">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{ getQuestion.title }}</div>
                        <div class="md-subhead">Author</div>
                    </md-card-header-text>
                    <md-card-media>
                        <md-badge
                            v-bind:class="getQuestion.votes !== 0 ? 'md-primary' : 'md-accent'"
                            v-bind:md-content="getQuestion.votes"
                        />
                    </md-card-media>
                </md-card-header>

                <md-card-content>
                    <div>{{ getQuestion.text }}</div>
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-primary" @click="upvoteQuestion"><md-icon>arrow_upward</md-icon> </md-button>
                </md-card-actions>
            </md-card>
        </div>

        <br />
    </div>
</template>

<script>
export default {
    name: "QuestionDetail",
    data() {
        return {
            getQuestion: {},
            questionId: this.$route.params.id,
        };
    },
    watch: {
        $route(to) {
            this.questionId = to.params.id;
        },
    },
    apollo: {
        getQuestion: {
            query: require("../graphql/QuestionDetail.gql"),
            variables() {
                return {
                    questionId: this.questionId,
                };
            },
        },
    },
    methods: {
        upvoteQuestion() {
            this.$apollo.mutate({
                mutation: require("../graphql/UpvoteQuestion.gql"),
                variables: {
                    questionId: this.questionId,
                },
                optimisticResponse: {
                    __typename: "Mutation",
                    upvoteQuestion: {
                        __typename: "Question",
                        id: this.questionId,
                        votes: this.getQuestion.votes + 1,
                    },
                },
            });
        },
    },
};
</script>
