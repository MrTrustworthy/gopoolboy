<template>
    <div id="questions">
        <QuestionOverview />
    </div>
</template>

<script>
import QuestionOverview from "@/components/QuestionOverview.vue";
export default {
    name: "Questions",
    components: {
        QuestionOverview,
    },
};
</script>
