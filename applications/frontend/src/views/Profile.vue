<template>
    <div id="profile">
        <ProfileDetail :userId="userId" :editable="false"/>
    </div>
</template>

<script>
    import ProfileDetail from "@/components/ProfileDetail.vue";

    export default {
        name: "Profile",
        components: {
            ProfileDetail,
        },
        data() {
            return {
                getUser: {},
                userId: this.$route.params.userId,
            };
        },
        watch: {
            $route(to) {
                this.userId = to.params.userId;
            },
        },
    };
</script>
