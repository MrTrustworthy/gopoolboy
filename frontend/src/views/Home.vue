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
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>