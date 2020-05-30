<template>
    <div>
        <h1>{{ getAnswers.length }} Answers</h1>
        <div v-if="$apollo.queries.getAnswers.loading" class="loading apollo">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card v-for="answer of getAnswers" :key="answer.id">
                <md-card-header>
                    <md-card-header-text>
                        <md-button class="md-subhead" v-bind:to="'/profile/' + answer.authorId">
                            by {{ getUserNickName(answer.authorId) }}
                        </md-button>
                        <div class="md-subhead">{{ answer.createdAt.split("GMT")[0] }}</div>
                    </md-card-header-text>
                    <md-card-media>
                        <md-badge
                            v-bind:class="answer.votes !== 0 ? 'md-primary' : 'md-accent'"
                            v-bind:md-content="answer.votes"
                        />
                    </md-card-media>
                </md-card-header>

                <md-card-content>
                    <div>{{ answer.text }}</div>
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-primary" @click="() => upvoteAnswer(answer.id)"
                        ><md-icon>arrow_upward</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>
        </div>

        <br />
    </div>
</template>

<script>
export default {
    name: "AnswerOverview",
    data() {
        return {
            getAnswers: {},
            getUsers: [],
            questionId: this.$route.params.id,
        };
    },
    watch: {
        $route(to) {
            this.questionId = to.params.id;
        },
    },
    apollo: {
        getAnswers: {
            query: require("../graphql/AnswerOverview.gql"),
            variables() {
                return {
                    questionId: this.questionId,
                };
            },
        },
        getUsers: {
            query: require("../graphql/OrganizationUserList.gql"),
            client: "orgamonClient",
        },
    },
    methods: {
        getUserNickName(userId) {
            let users = this.getUsers.filter((u) => u.id == userId).map((u) => u.nickname);
            if (users.length === 0) {
                return userId;
            }
            return users[0];
        },
        upvoteAnswer(answerId) {
            this.$apollo.mutate({
                mutation: require("../graphql/UpvoteAnswer.gql"),
                variables: { answerId },
            });
        },
    },
};
</script>
