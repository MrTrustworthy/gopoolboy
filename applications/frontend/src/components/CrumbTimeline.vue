<template>
    <v-timeline>
        <v-timeline-item
                v-for="crumb in orderedCrumbs"
                :key="crumb.id"
                large
        >
            <template v-slot:opposite>
                <CreatedAListItem :timestamp="crumb.createdAt" :show-icon="false"/>
            </template>

            <template v-slot:icon>
                <CrumbTypeIcon :crumb-type="crumb.type"/>
            </template>

            <v-card>
                <CrumbSummary :id="crumb.id" v-on:clicked-summary="routeToFull"/>
            </v-card>

        </v-timeline-item>
    </v-timeline>
</template>

<script>
    import CreatedAListItem from "./CreatedAtListItem";
    import CrumbTypeIcon from "./CrumbTypeIcon";
    import CrumbSummary from "./CrumbSummary";
    import {fromId} from "@/urlids";

    export default {
        name: "CrumbTimeline",
        components: {CrumbSummary, CrumbTypeIcon, CreatedAListItem},
        props: {
            authorId: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                getCrumbsByAuthor: []
            };
        },
        computed: {
            orderedCrumbs() {
                return this.getCrumbsByAuthor.slice().sort((a, b) => b.createdAt - a.createdAt);
            }
        },
        methods: {
            routeToFull(id) {
                this.$router.push({name: "crumbdetail", params: {id: fromId(id)}});
            }
        },
        apollo: {
            getCrumbsByAuthor: {
                query: require("../graphql/GetCrumbsByAuthor.gql"),
                variables() {
                    return {authorId: this.authorId};
                },
                client: "crumblerClient",
            },
        },
    };
</script>

<style scoped>

</style>