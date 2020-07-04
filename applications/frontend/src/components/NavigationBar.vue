<template>
    <v-list>
        <v-list-item id="tab-search" :to="{name: 'search'}">
            <v-list-item-icon>
                <v-icon>search</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Search</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item id="tab-tags" :to="{name: 'tags'}">
            <v-list-item-icon>
                <v-icon>label</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Tags</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item id="tab-about" :to="{name: 'about'}">
            <v-list-item-icon>
                <v-icon>help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
                id="tab-profile"
                :v-disabled="$auth.loading"
                :to="{ name: 'profile', params: {userId: profileId}}"
        >
            <v-list-item-icon>
                <v-icon>{{ $auth.loading ? "perm_identity" : "face" }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item id="tab-organization" :to="{name: 'organization'}">
            <v-list-item-icon>
                <v-icon>admin_panel_settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Organization</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

    </v-list>
</template>
<script>
    export default {
        name: "NavigationBar",
        components: {},
        computed: {
            profileId() {
                return this.$auth && this.$auth.user && this.$auth.user.sub ? this.$auth.user.sub : 'unknown';
            }
        }
    };

</script>
