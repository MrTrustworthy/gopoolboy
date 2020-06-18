<template>
    <v-snackbar v-model="notify" timeout="-1" app>

        <span>{{ notifications[0] }}</span>
        <template v-slot:action="{ attrs }">
            <v-badge v-if="amount > 1" :content="amount">
                <v-btn v-bind="attrs" @click="clearNotification">OK</v-btn>
            </v-badge>
            <v-btn v-else v-bind="attrs" @click="clearNotification">OK</v-btn>
        </template>

    </v-snackbar>
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

