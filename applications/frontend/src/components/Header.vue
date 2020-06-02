<template>
    <div>
        <!--img class="md-layout-item" alt="Poolboy logo" src="../assets/icon.png" width="32" height="32" /-->
        <CreateWidgetSnackbar />

        <md-tabs md-sync-route class="md-primary" md-alignment="centered" md-elevation="3">
            <md-tab id="tab-crumbs" to="/crumbs" md-label="Crumbs" md-icon="dynamic_feed"></md-tab>
            <md-tab id="tab-about" to="/about" md-label="About" md-icon="help"> </md-tab>
            <md-tab
                id="tab-profile"
                md-label="Profile"
                v-bind:md-disabled="$auth.loading"
                v-bind:md-icon="$auth.loading ? 'perm_identity' : 'face'"
                v-bind:to="'/profile/' + ($auth.user ? $auth.user.sub : '')"
            ></md-tab>
            <md-tab
                id="tab-organization"
                to="/organization"
                md-label="Organization"
                md-icon="admin_panel_settings"
            ></md-tab>
        </md-tabs>
    </div>
</template>

<script>
import CreateWidgetSnackbar from "@/components/CreateWidgetSnackbar.vue";

export default {
    name: "Header",
    components: { CreateWidgetSnackbar },
};
</script>
