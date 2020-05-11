<template>
    <div class="home">
        <QuestionOverview />
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

<style scoped>
    .home {
        margin-top: 60px;
    }
</style>