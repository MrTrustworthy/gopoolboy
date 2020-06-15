<template>
    <div id="crumbs">
        <CreateWidgetSnackbar/>
        <SearchCrumb crumbType="question" v-on:found-ids="(ids) => crumbIds = ids"/>
        <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="routeToFull"/>
    </div>
</template>

<script>
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";
    import CrumbList from "../components/CrumbList";
    import SearchCrumb from "../components/SearchCard";
    import {fromId} from "@/urlids";

    export default {
        name: "Crumbs",
        data() {
            return {
                crumbIds: []
            };
        },
        components: {
            SearchCrumb,
            CrumbList,
            CreateWidgetSnackbar,
        },
        methods: {
            routeToFull(id) {
                this.$router.push({name: "crumbdetail", params: {id: fromId(id)}});
            }
        }
    };
</script>
