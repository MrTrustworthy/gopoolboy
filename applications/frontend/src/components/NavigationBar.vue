<template>
    <div>
        <md-list md-sync-route class="md-primary" md-alignment="centered" md-elevation="3">
            <md-list-item id="tab-crumbs" to="/crumbs">
                <md-icon>dynamic_feed</md-icon>
                <span class="md-list-item-text">Crumbs</span>
                <md-tooltip md-size="large" md-direction="right">Crumbs</md-tooltip>
            </md-list-item>
            <md-list-item id="tab-about" to="/about">
                <md-icon>help</md-icon>
                <span class="md-list-item-text">About</span>
                <md-tooltip md-size="large" md-direction="right">About</md-tooltip>
            </md-list-item>
            <md-list-item
                id="tab-profile"
                v-bind:md-disabled="$auth.loading"
                v-bind:to="'/profile/' + ($auth.user ? $auth.user.sub : '')"
            >
                <md-icon>{{ $auth.loading ? "perm_identity" : "face" }}</md-icon>
                <span class="md-list-item-text">Profile</span>
                <md-tooltip md-size="large" md-direction="right">Profile</md-tooltip>
            </md-list-item>
            <md-list-item id="tab-organization" to="/organization">
                <md-icon>admin_panel_settings</md-icon>
                <span class="md-list-item-text">Organization</span>
                <md-tooltip md-size="large" md-direction="right">Organization</md-tooltip>
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
