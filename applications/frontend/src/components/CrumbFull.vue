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
                <v-card-title>
                    {{ getCrumb.title }}
                </v-card-title>
            </v-container>

            <v-container>
                <v-list dense>
                    <AuthorListItem :author-id="getCrumb.authorId"/>
                    <AddLinkListItem
                            :crumb-id="id"
                            v-on:added-link="() => $emit('added-link')"
                    />
                    <CreatedAtListItem :timestamp="getCrumb.createdAt"/>
                </v-list>
            </v-container>
            <v-divider></v-divider>

            <v-container fluid class="secondary">
                <v-card-text>
                    <div v-html="crumbTextMarkdown"/>
                </v-card-text>
            </v-container>
            <v-divider></v-divider>

            <v-card-actions>
                <v-chip v-for="tag in getCrumb.tags" :key="tag.key + tag.value">
                    {{ tag.key }}:{{ tag.value }}
                </v-chip>
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
    import AddLinkListItem from "./AddLinkListItem";
    import CreatedAtListItem from "./CreatedAtListItem";
    import AuthorListItem from "./AuthorListItem";
    import CrumbTypeIcon from "./CrumbTypeIcon";

    export default {
        name: "CrumbFull",
        components: {CrumbTypeIcon, AuthorListItem, CreatedAtListItem, AddLinkListItem, Votes},
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
