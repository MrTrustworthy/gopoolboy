<template>
    <div>
        <v-skeleton-loader v-if="isLoading" type="card"></v-skeleton-loader>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            An error occured :(
        </div>

        <v-card v-else shaped>

            <v-container>
                <v-row align="center" justify="center">

                    <v-col cols="3" align="center">
                        <CrumbTypeIcon :crumb-type="getCrumb.type"></CrumbTypeIcon>
                    </v-col>

                    <v-col cols="6">
                        <Votes
                                :votes="getCrumb.votes"
                                :own-vote="getCrumb.ownVote"
                                :object-id="id"
                                object-type="crumb"
                        />
                    </v-col>

                    <v-col cols="3">
                        <v-btn v-if="!main" class="mx-auto"
                               :to="{name: 'crumbdetail', params: {id: fromId(getCrumb.id)} }">
                            <v-icon>all_out</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>
            </v-container>

            <v-container fluid>
                <v-card-title class="secondary">
                    {{ getCrumb.title }}
                </v-card-title>
            </v-container>


            <DetailActionButtons :source-object="getCrumb" :show-add-link="true"/>

            <v-container fluid>
                <v-card-text class="secondary">
                    <div v-html="crumbTextMarkdown"/>
                </v-card-text>
            </v-container>

            <v-card-actions>
                <Tags :tag-ids="getCrumb.tags"/>
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
            main: {type: Boolean, default: false}
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
            },
            isLoading() {
                return this.getCrumb === undefined || this.$apollo.queries.getCrumb.loading;
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
