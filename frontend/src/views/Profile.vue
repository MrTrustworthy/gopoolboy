<template>
    <div class="profile">
        <ProfileDetail />
    </div>
</template>

<script>
    import ProfileDetail from '@/components/ProfileDetail.vue'
    export default {
        name: 'Home',
        components: {
            ProfileDetail
        }
    }
</script>

<style scoped>
    .profile {
        margin-top: 60px;
    }
</style>