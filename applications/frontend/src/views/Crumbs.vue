<template>
    <div id="crumbs">
        <CreateWidgetSnackbar/>
        <SearchableCrumbList crumbType="question"/>
    </div>
</template>

<script>
    import SearchableCrumbList from "@/components/SearchableCrumbList.vue";
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";

    export default {
        name: "Crumbs",
        components: {
            SearchableCrumbList,
            CreateWidgetSnackbar,
        },
    };
</script>
