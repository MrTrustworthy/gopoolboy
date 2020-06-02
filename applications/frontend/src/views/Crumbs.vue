<template>
    <div id="crumbs">
        <SearchableCrumbList crumbType="question" />
    </div>
</template>

<script>
import SearchableCrumbList from "@/components/SearchableCrumbList.vue";

export default {
    name: "Crumbs",
    components: {
        SearchableCrumbList,
    },
};
</script>
