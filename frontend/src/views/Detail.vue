<template>
    <div id="detail">
        <QuestionDetail />
    </div>
</template>

<script>
    import QuestionDetail from '@/components/QuestionDetail.vue'
    export default {
        name: 'DetailView',
        components: {
            QuestionDetail
        }
    }
</script>

<style>
    #detail {
        margin-top: 60px;
    }
</style>