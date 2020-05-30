<template>
    <div id="detail">
        <QuestionDetail />
        <AnswerOverview />
        <NewAnswer />
    </div>
</template>

<script>
import QuestionDetail from "@/components/QuestionDetail.vue";
import AnswerOverview from "@/components/AnswerOverview.vue";
import NewAnswer from "@/components/NewAnswer.vue";

export default {
    name: "DetailView",
    components: {
        QuestionDetail,
        AnswerOverview,
        NewAnswer,
    },
};
</script>
