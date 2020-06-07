<template>
    <div id="speeddial">
        <md-speed-dial class="md-top-right" md-direction="bottom">
            <md-speed-dial-target>
                <md-icon class="md-morph-initial">add</md-icon>
                <md-icon class="md-morph-final">edit</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content>
                <md-button class="md-icon-button" @click="showDialog = true">
                    <md-icon>note</md-icon>
                </md-button>
            </md-speed-dial-content>
        </md-speed-dial>
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
            return { showDialog: false };
        },
        methods: {
            notifyFailure() {
                this.$store.commit("addPendingNotification", "Failed to create new question!");
            },
        },
    };
</script>
