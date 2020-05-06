<template>
    <div id="home">
        <QuestionOverview msg="Most recent questions:"/>
    </div>
</template>

<script>
    import QuestionOverview from '@/components/QuestionOverview.vue'
    export default {
        name: 'Home',
        components: {
            QuestionOverview
        }
    }
</script>

<style>
    #home {
        margin-top: 60px;
    }
</style>