<template>
    <div id="home">
        <QuestionOverview />
        <NewQuestion />
    </div>
</template>

<script>
import QuestionOverview from "@/components/QuestionOverview.vue";
import NewQuestion from "@/components/NewQuestion.vue";
export default {
    name: "Home",
    components: {
        QuestionOverview,
        NewQuestion,
    },
};
</script>
