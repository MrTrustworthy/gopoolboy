<template>
    <div>
        <md-button class="md-subhead" @click="showDialog = true">
            <md-icon>link</md-icon>
            New link
        </md-button>
        <md-dialog :md-active.sync="showDialog">
            <SearchCrumb crumb-type="all" v-on:found-ids="(ids) => crumbIds = ids"/>
            <CrumbList :crumb-ids="crumbIdsToShow" v-on:clicked-summary="addLink"/>
        </md-dialog>
    </div>
</template>

<script>
    import SearchCrumb from "./SearchCrumbs";
    import CrumbList from "./CrumbList";

    export default {
        name: "AddLinkButton",
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
