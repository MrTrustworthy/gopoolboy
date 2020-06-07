<template>
    <md-snackbar :md-duration="Infinity" :md-active="notify">
        <span>{{ notifications[0] }}</span>
        <md-button class="md-primary" @click="clearNotification">OK</md-button>
    </md-snackbar>
</template>

<script>
    export default {
        name: "Notifications",
        computed: {
            notifications() {
                return this.$store.state.pendingNotifications;
            },
            notify() {
                return this.$store.state.pendingNotifications.length > 0;
            },
        },
        methods: {
            clearNotification() {
                this.$store.commit("clearNotification");
            },
        },
    };
</script>

