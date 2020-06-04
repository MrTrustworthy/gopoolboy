<template>
    <div id="crumbs">
        <CreateWidgetSnackbar />
        <SearchableCrumbList crumbType="question" />
    </div>
</template>

<script>
import SearchableCrumbList from "@/components/SearchableCrumbList.vue";
import CreateWidgetSnackbar from "@/components/CreateWidgetSnackbar.vue";

export default {
    name: "Crumbs",
    components: {
        SearchableCrumbList,
        CreateWidgetSnackbar,
    },
};
</script>
