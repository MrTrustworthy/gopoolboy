<template>
    <div>
        <div v-if="$auth.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{ $auth.user.nickname }}</div>
                        <div class="md-subhead">ID: {{ $auth.user.sub }}</div>
                    </md-card-header-text>

                    <md-card-media md-small>
                        <img :src="$auth.user.picture" alt="UserProfilePic" />
                    </md-card-media>
                </md-card-header>

                <md-card-content>
                    <div>Name: {{ $auth.user.name }}</div>
                    <div>Email: {{ $auth.user.email }}</div>
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-raised md-accent" @click="logout">Logout</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileDetail",
    methods: {
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
};
</script>
