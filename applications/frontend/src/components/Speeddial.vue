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

            <v-btn @click="showDialog = true" fab small>
                <v-icon>add</v-icon>
            </v-btn>

        </v-speed-dial>


        <md-dialog :md-active.sync="showDialog">
            <NewCrumb
                    crumbType="question"
                    v-on:confirmed-action="showDialog = false"
                    v-on:failed-action="notifyFailure"
            />
        </md-dialog>

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
