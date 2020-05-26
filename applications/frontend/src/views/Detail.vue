<template>
    <div id="detail">
        <QuestionDetail />
        <AnswerOverview />
    </div>
</template>

<script>
import QuestionDetail from "@/components/QuestionDetail.vue";
import AnswerOverview from "@/components/AnswerOverview.vue";

export default {
    name: "DetailView",
    components: {
        QuestionDetail,
        AnswerOverview,
    },
};
</script>

<style>
#detail {
    margin-top: 60px;
}
</style>
