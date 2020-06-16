<template>
    <v-badge
            :class="votes <= 0 ? 'md-primary' : 'md-accent'"
            :content="votes.toString()"
    >
        <div>
            <v-btn @click="() => voteCrumb(1)">
                <md-icon :class="getVoteStyle(1)">arrow_upward</md-icon>
            </v-btn>

            <v-btn @click="() => voteCrumb(-1)">
                <md-icon :class="getVoteStyle(-1)">arrow_downward</md-icon>
            </v-btn>

        </div>
    </v-badge>
</template>

<script>
    import {fromId} from "@/urlids";
    import moment from "moment";

    export default {
        name: "Votes",
        props: {
            votes: {type: Number, required: true},
            ownVote: {type: Number, required: true},
            objectId: {type: [String, Number], required: true},
            objectType: {type: String, required: true}
        },
        computed: {
            mutationArgs() {
                if (this.objectType === "crumb") return {gql: "VoteCrumb", client: "crumbler"};
                else if (this.objectType === "crumblink") return {gql: "VoteCrumbLink", client: "zelda"};
                else throw new Error(`objectType must be crumb or crumblink, not ${this.objectType}`);
            }
        },
        methods: {
            getVoteStyle(vote) {
                return vote === this.ownVote ? 'md-accent' : 'md-primary';
            },
            voteCrumb(vote) {
                // remove vote if it's the already-active vote
                if (vote === this.ownVote) vote = 0;

                this.$apollo.mutate({
                    mutation: require(`../graphql/${this.mutationArgs.gql}.gql`),
                    variables: {
                        id: this.objectId,
                        vote: vote
                    },
                    client: `${this.mutationArgs.client}Client`,
                });
            },
        },
    };
</script>
