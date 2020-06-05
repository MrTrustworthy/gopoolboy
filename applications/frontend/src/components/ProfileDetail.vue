<template>
    <div>
        <div v-if="$auth.loading">
            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else>
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <md-button class="md-title" v-bind:to="'/profile/' + getUser.id">
                            {{ getUser.nickname }} {{ isSelf ? "(You)" : "" }}
                        </md-button>
                        <div class="md-subhead">ID: {{ getUser.id }}</div>
                    </md-card-header-text>

                    <md-card-media md-small>
                        <md-avatar class="md-large">
                            <img :src="getUser.picture" alt="UserProfilePic" />
                        </md-avatar>
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

                <div v-if="editable">
                    <md-card-content>
                        <md-field>
                            <md-select v-model="newUserRole" placeholder="New Role">
                                <md-option v-for="role in possibleRoles" :key="role.name" :value="role.name">
                                    {{ role.name }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-primary" @click="changeUserRole">Update</md-button>
                        <md-button class="md-primary" disabled>Reset password</md-button>
                        <md-button class="md-accent" @click="() => (confirmRemoveUser = true)">Remove user</md-button>
                    </md-card-actions>
                </div>

                <md-card-actions v-if="isSelf">
                    <md-button class="md-raised md-accent" @click="logout">Logout</md-button>
                </md-card-actions>
            </md-card>
        </div>

        <md-snackbar :md-duration="5000" :md-active.sync="notify">
            <span>{{ notifyMessage }}</span>
            <md-button class="md-primary" @click="notify = false">OK</md-button>
        </md-snackbar>

        <md-dialog-confirm
            :md-active.sync="confirmRemoveUser"
            :md-title="'Do you really want to remove the user' + getUser.name"
            md-content="This will remove this user. Content of that user, such as crumbs or votes, will not be deleted. This operation can't be reversed."
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-cancel="onCancelRemoveUser"
            @md-confirm="onConfirmRemoveUser"
        />
    </div>
</template>

<script>
export default {
    name: "ProfileDetail",
    props: {
        userId: {
            type: String,
            required: true,
        },
        editable: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            getUser: {},
            getRoles: [],
            newUserRole: null,
            notify: false,
            confirmRemoveUser: false,
            notifyMessage: "",
        };
    },
    computed: {
        isSelf: function() {
            return this.getUser.email === this.$auth.user.email;
        },
        possibleRoles: function() {
            return this.getRoles.filter((r) => r.name !== this.getUser.organizationRole);
        },
    },
    apollo: {
        getUser: {
            query: require("../graphql/GetUser.gql"),
            variables() {
                return {
                    userId: this.userId,
                };
            },
        },
        getRoles: {
            query: require("../graphql/GetRoles.gql"),
        },
        $client: "orgamonClient",
    },
    methods: {
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },

        changeUserRole() {
            if (!this.newUserRole) {
                this.notifyMessage = "Can't change the role of an user if no role is selected";
                this.notify = true;
                return;
            }
            console.log("Changing role for user", this.userId, "to", this.newUserRole);
            this.$apollo
                .mutate({
                    mutation: require("../graphql/ChangeUserRole.gql"),
                    variables: {
                        userId: this.userId,
                        role: this.newUserRole,
                    },
                })
                .then((_) => (this.newUserRole = null));
        },
        onConfirmRemoveUser() {
            console.log("Deleting user", this.userId);
            this.$apollo.mutate({
                mutation: require("../graphql/DeleteUser.gql"),
                variables: {
                    userId: this.userId,
                },
            });
        },
        onCancelRemoveUser() {
            console.log("Aborted deleting user", this.userId);
            this.notifyMessage = "Removal of user cancelled";
            this.notify = true;
            return;
        },
    },
};
</script>
