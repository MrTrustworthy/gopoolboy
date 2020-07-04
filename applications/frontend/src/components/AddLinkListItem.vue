<template>
    <v-dialog v-model="showDialog" max-width="600" scrollable>

        <template v-slot:activator="{ on, attrs }">

            <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-icon>
                    <v-icon>link</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Add Link</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </template>

        <v-card>
            <v-card-title>
                <SearchCard crumb-type="all" v-on:found-ids="(ids) => crumbIds = ids"/>
            </v-card-title>
            <v-card-text>
                <CrumbList :crumb-ids="crumbIdsToShow" v-on:clicked-summary="addLink"/>
            </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
    import SearchCard from "./SearchCard";
    import CrumbList from "./CrumbList";

    export default {
        name: "AddLinkListItem",
        components: {SearchCard, CrumbList},
        props: {
            crumbId: {
                type: [String, Number],
                required: true
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
                // This means that sometimes the count shown in SearchCard is wrong :/
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
                    refetchQueries: ["GetLinkedCrumbIds"],
                    client: "zeldaClient",
                });
                this.showDialog = false;
            }
        },
    };
</script>
