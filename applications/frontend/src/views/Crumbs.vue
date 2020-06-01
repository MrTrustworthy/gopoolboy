<template>
    <div id="crumbs">
        <NewCrumb crumbType="question" />
        <SearchableCrumbList crumbType="question" />
    </div>
</template>

<script>
import SearchableCrumbList from "@/components/SearchableCrumbList.vue";
import NewCrumb from "@/components/NewCrumb.vue";

export default {
    name: "Crumbs",
    components: {
        SearchableCrumbList,
        NewCrumb,
    },
};
</script>
