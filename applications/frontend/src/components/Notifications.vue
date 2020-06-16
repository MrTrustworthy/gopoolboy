<template>
    <md-snackbar :md-duration="Infinity" :md-active="notify">

        <span>
            <md-badge class="md-accent" v-if="amount > 1" :md-content="amount"/>
            {{ notifications[0] }}
        </span>
        <v-btn class="md-primary" @click="clearNotification">OK</v-btn>
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
            amount() {
                return this.$store.state.pendingNotifications.length;
            }
        },
        methods: {
            clearNotification() {
                this.$store.commit("clearNotification");
            },
        },
    };
</script>

