<template>
    <div id="search">
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
    import {encodeId} from "@/urlids";

    export default {
        name: "Search",
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
                this.$router.push({name: "crumbdetail", params: {id: encodeId(id)}});
            }
        }
    };
</script>
