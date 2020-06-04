<template>
    <div>
        <!--img class="md-layout-item" alt="Poolboy logo" src="../assets/icon.png" width="32" height="32" /-->

        <md-list md-sync-route class="md-primary" md-alignment="centered" md-elevation="3">
            <md-list-item id="tab-crumbs" to="/crumbs">
                <md-icon>dynamic_feed</md-icon>
                <span class="md-list-item-text">Crumbs</span>
            </md-list-item>
            <md-list-item id="tab-about" to="/about">
                <md-icon>help</md-icon>
                <span class="md-list-item-text">About</span>
            </md-list-item>
            <md-list-item
                id="tab-profile"
                v-bind:md-disabled="$auth.loading"
                v-bind:to="'/profile/' + ($auth.user ? $auth.user.sub : '')"
            >
                <md-icon>{{ $auth.loading ? "perm_identity" : "face" }}</md-icon>
                <span class="md-list-item-text">Profile</span>
            </md-list-item>
            <md-list-item id="tab-organization" to="/organization">
                <md-icon>admin_panel_settings</md-icon>
                <span class="md-list-item-text">Organization</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: "NavigationBar",
    components: {},
};
</script>
