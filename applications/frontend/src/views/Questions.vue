<template>
    <div id="questions">
        <SearchQuestion />
    </div>
</template>

<script>
import SearchQuestion from "@/components/SearchQuestion.vue";

export default {
    name: "Questions",
    components: {
        SearchQuestion,
    },
};
</script>
