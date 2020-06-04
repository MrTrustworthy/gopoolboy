<template>
    <div id="createwidgetsnackbar">
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
                v-on:failed-action="notifyFailure = true"
            />
        </md-dialog>

        <md-snackbar :md-duration="5000" :md-active.sync="notifyFailure">
            <span>Failed to create a crumb!</span>
            <md-button class="md-primary" @click="notify = false">OK</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import NewCrumb from "@/components/NewCrumb.vue";

export default {
    name: "CreateWidgetSnackbar",
    components: {
        NewCrumb,
    },
    data() {
        return { showDialog: false, notifyFailure: false };
    },
};
</script>
