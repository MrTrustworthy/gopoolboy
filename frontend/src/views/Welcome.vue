<template>
    <div class="welcome">
        <SignUpIn />
    </div>
</template>

<script>
    import SignUpIn from '@/components/SignUpIn.vue'
    export default {
        name: 'Home',
        components: {
            SignUpIn
        }
    }
</script>

<style scoped>
    .welcome {
        margin-top: 60px;
    }
</style>