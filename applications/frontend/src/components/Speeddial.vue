<template>
    <div id="speeddial">

        <v-speed-dial open-on-hover absolute v-model="fab" direction="bottom" top right
                      transition="slide-y-reverse-transition">

            <template v-slot:activator>
                <v-btn v-model="fab" fab>
                    <v-icon v-if="fab">close</v-icon>
                    <v-icon v-else>edit</v-icon>
                </v-btn>
            </template>

            <v-btn @click.stop="showDialog = true" fab small>
                <v-icon>help</v-icon>
            </v-btn>

        </v-speed-dial>

        <v-dialog v-model="showDialog" max-width="800">
            <NewCrumb
                    crumbType="question"
                    v-on:confirmed-action="showDialog = false"
                    v-on:failed-action="notifyFailure"
            />
        </v-dialog>

    </div>
</template>

<script>
    import NewCrumb from "@/components/NewCrumb.vue";

    export default {
        name: "Speeddial",
        components: {
            NewCrumb,
        },
        data() {
            return {showDialog: false, fab: false};
        },
        methods: {
            notifyFailure() {
                this.$store.commit("addPendingNotification", "Failed to create new question!");
            },
        },
    };
</script>
