<template>
    <v-badge
            :color="votes <= 0 ? 'primary' : 'accent'"
            :content="votes.toString()"
    >

        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="() => voteCrumb(1)" v-bind="attrs" v-on="on">
                    <v-icon :color="getVoteStyle(1)">arrow_upward</v-icon>
                </v-btn>
            </template>
            <span>{{ getVoteTooltip(1) }}</span>
        </v-tooltip>


        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="() => voteCrumb(-1)" v-bind="attrs" v-on="on">
                    <v-icon :color="getVoteStyle(-1)">arrow_downward</v-icon>
                </v-btn>
            </template>
            <span>{{ getVoteTooltip(-1) }}</span>
        </v-tooltip>

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
            },
        },
        methods: {
            getVoteStyle(vote) {
                return vote === this.ownVote ? 'accent' : 'primary';
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
            getVoteTooltip(vote) {
                const tooltips = {
                    crumb: {
                        '1': "This is a high-quality post",
                        '-1': "This crumb needs to be improved"
                    },
                    crumblink: {
                        '1': "This is relevant top crumb",
                        '-1': "This has little to do with the top crumb"
                    }
                };

                return tooltips[this.objectType][vote];
            }
        },
    };
</script>
