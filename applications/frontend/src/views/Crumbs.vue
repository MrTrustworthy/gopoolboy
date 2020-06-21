<template>
    <div id="crumbs">
        <CreateWidgetSnackbar/>
        <SearchCard crumbType="question" v-on:found-ids="(ids) => crumbIds = ids"/>
        <br>
        <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="routeToFull"/>
    </div>
</template>

<script>
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";
    import CrumbList from "../components/CrumbList";
    import SearchCard from "../components/SearchCard";
    import {fromId} from "@/urlids";

    export default {
        name: "Crumbs",
        data() {
            return {
                crumbIds: []
            };
        },
        components: {
            SearchCard,
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
