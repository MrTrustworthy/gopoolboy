<template>
    <!--img class="md-layout-item" alt="Poolboy logo" src="../assets/icon.png" width="32" height="32" /-->
    <md-tabs md-sync-route class="md-primary" md-alignment="centered" md-elevation="3">
        <md-tab id="tab-new" to="/new" md-label="Ask" md-icon="add_box"></md-tab>

        <md-tab id="tab-home" to="/" md-label="Home" md-icon="article"></md-tab>

        <md-tab id="tab-about" to="/about" md-label="About" md-icon="help"></md-tab>
        <md-tab
            id="tab-profile"
            md-label="Profile"
            v-bind:md-disabled="$auth.loading"
            v-bind:md-icon="$auth.loading ? 'verified' : 'verified_user'"
            to="/profile"
        ></md-tab>
        <md-tab
            id="tab-organization"
            to="/organization"
            md-label="Organization"
            md-icon="admin_panel_settings"
        ></md-tab>
    </md-tabs>
</template>

<script>
export default {
    name: "Header",
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
};
</script>
