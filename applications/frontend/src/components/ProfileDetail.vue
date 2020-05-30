<template>
    <div>
        <div v-if="$auth.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">
                            {{ getUser.nickname }} {{ getUser.email === $auth.user.email ? "(You)" : "" }}
                        </div>
                        <div class="md-subhead">ID: {{ getUser.id }}</div>
                    </md-card-header-text>

                    <md-card-media md-small>
                        <img :src="getUser.picture" alt="UserProfilePic" />
                    </md-card-media>
                </md-card-header>

                <md-card-content>
                    <div>Name: {{ getUser.name }}</div>
                    <div>Email: {{ getUser.email }}</div>
                    <div>Role: {{ getUser.organizationRole }}</div>
                    <div>Created at: {{ getUser.createdAt }}</div>
                    <div>Last Login: {{ getUser.lastLogin }}</div>
                    <div>Logins: {{ getUser.loginCount }}</div>
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
    data() {
        return {
            getUser: {},
            userId: this.$route.params.userId,
        };
    },
    watch: {
        $route(to) {
            this.userId = to.params.userId;
        },
    },
    methods: {
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
    apollo: {
        getUser: {
            query: require("../graphql/GetUser.gql"),
            client: "orgamonClient",
            variables() {
                return {
                    userId: this.userId,
                };
            },
        },
    },
};
</script>
