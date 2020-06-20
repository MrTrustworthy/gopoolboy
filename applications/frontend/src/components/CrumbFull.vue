<template>
    <div>
        <v-skeleton-loader v-if="$apollo.queries.getCrumb.loading" type="card"></v-skeleton-loader>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            An error occured :(
        </div>

        <v-card v-else shaped>

            <v-container>
                <CrumbTypeIcon :crumb-type="getCrumb.type"></CrumbTypeIcon>
                <v-card-title class="secondary">
                    {{ getCrumb.title }}
                </v-card-title>
            </v-container>

            <DetailActionButtons :source-object="getCrumb" :show-add-link="true"
                                 v-on:added-link="() => $emit('added-link')"/>

            <v-container fluid>
                <v-card-text class="secondary">
                    <div v-html="crumbTextMarkdown"/>
                </v-card-text>
            </v-container>

            <v-card-actions>

                <Tags :tags="getCrumb.tags"/>
            </v-card-actions>
            <v-card-actions>
                <Votes
                        :votes="getCrumb.votes"
                        :own-vote="getCrumb.ownVote"
                        :object-id="id"
                        object-type="crumb"
                />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {fromId} from "@/urlids";
    import Votes from "./Votes";
    import DOMPurify from 'dompurify';
    import marked from "marked";
    import CrumbTypeIcon from "./CrumbTypeIcon";
    import DetailActionButtons from "./DetailActionButtons";
    import Tags from "./Tags";

    export default {
        name: "CrumbFull",
        components: {Tags, DetailActionButtons, CrumbTypeIcon, Votes},
        props: {
            id: {type: [String, Number], required: true},
        },
        data() {
            return {
                getCrumb: {},
                fromId: fromId,
                getUsers: [],
            };
        },
        computed: {
            crumbTextMarkdown() {
                const dirty = marked(this.getCrumb.text);
                return DOMPurify.sanitize(dirty);
            }
        },
        apollo: {
            getCrumb: {
                query: require("../graphql/GetCrumb.gql"),
                variables() {
                    return {id: this.id};
                },
                client: "crumblerClient",
            },

        },
    };
</script>
