<template>
    <div>
        <md-button class="md-subhead" @click="showDialog = true">
            Link answer
        </md-button>
        <md-dialog :md-active.sync="showDialog">
            <SearchCrumb crumb-type="answer" v-on:found-ids="(ids) => crumbIds = ids"/>
            <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="addLink"/>
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
            crumbId: {type: [String, Number], required: true},
        },
        data() {
            return {
                showDialog: false,
                crumbIds: []
            };
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
            }
        },
    };
</script>
