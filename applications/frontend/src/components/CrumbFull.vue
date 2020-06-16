<template>
    <div>
        <div v-if="$apollo.queries.getCrumb.loading">
            <v-skeleton-loader type="card"></v-skeleton-loader>
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.getCrumb.error">
            An error occured :(
        </div>

        <div v-else>
            <v-card>

                <v-card-title>
                    Type: {{ getCrumb.type }}
                </v-card-title>
                <v-card-title>
                    {{ getCrumb.title }}
                </v-card-title>
                <v-list dense shaped>
                    <AuthorListItem :author-id="getCrumb.authorId"/>
                    <AddLinkListItem
                            :crumb-id="id"
                            v-on:added-link="() => $emit('added-link')"
                    />
                    <CreatedAtListItem :timestamp="getCrumb.createdAt"/>
                </v-list>

                <v-divider></v-divider>
                <v-card-text>
                    <div v-html="crumbTextMarkdown"/>
                </v-card-text>
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

    export default {
        name: "CrumbFull",
        components: {AuthorListItem, CreatedAtListItem, AddLinkListItem, Votes},
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
