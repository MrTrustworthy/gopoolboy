<template>
    <div id="crumbs">
        <CreateWidgetSnackbar/>
        <SearchCrumb crumbType="question" v-on:found-ids="(ids) => crumbIds = ids"/>
        <CrumbList :crumb-ids="crumbIds"/>
    </div>
</template>

<script>
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";
    import CrumbList from "../components/CrumbList";
    import SearchCrumb from "../components/SearchCrumbs";

    export default {
        name: "Crumbs",
        data(){
            return {
                crumbIds: []
            }
        },
        components: {
            SearchCrumb,
            CrumbList,
            CreateWidgetSnackbar,
        },
    };
</script>
