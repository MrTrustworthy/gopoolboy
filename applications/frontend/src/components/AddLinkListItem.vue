<template>
    <div>

        <v-list-item @click="showDialog=true">
            <v-list-item-icon>
                <v-icon>link</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Add Link</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <md-dialog :md-active.sync="showDialog">
            <SearchCrumb crumb-type="all" v-on:found-ids="(ids) => crumbIds = ids"/>
            <md-dialog-content>
                <CrumbList :crumb-ids="crumbIdsToShow" v-on:clicked-summary="addLink"/>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script>
    import SearchCrumb from "./SearchCard";
    import CrumbList from "./CrumbList";

    export default {
        name: "AddLinkListItem",
        components: {CrumbList, SearchCrumb},
        props: {
            crumbId: {
                type: [String, Number],
                required: true
            },
            addedLinkEvent: {
                type: String,
                default: "added-link",
            },
        },
        data() {
            return {
                showDialog: false,
                crumbIds: []
            };
        },
        computed: {
            crumbIdsToShow() {
                // This means that sometimes the count shown in SearchCrumb is wrong :/
                return this.crumbIds.filter(id => id !== this.crumbId);
            }
        },
        methods: {
            async addLink(linkId) {
                if (linkId === this.crumbId) {
                    this.$store.commit("addPendingNotification", "Can't link a crumb to itself!");
                    return;
                }

                await this.$apollo.mutate({
                    mutation: require("../graphql/CreateCrumbLink.gql"),
                    variables: {
                        fromId: linkId,
                        toId: this.crumbId,
                    },
                    client: "zeldaClient",
                });
                this.$emit(this.addedLinkEvent);
                this.showDialog = false;
            }
        },
    };
</script>
