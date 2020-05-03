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

<style scoped>
    #detail {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>