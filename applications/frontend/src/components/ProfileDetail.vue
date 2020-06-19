<template>
    <div>
        <v-skeleton-loader v-if="$auth.loading || $apollo.queries.getUser.loading" type="card"></v-skeleton-loader>
        <v-card v-else shaped>

            <v-container fluid>
                <v-list-item two-line v-bind:to="'/profile/' + getUser.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ getUser.nickname }} {{ isSelf ? "(You)" : "" }}</v-list-item-title>
                        <v-list-item-subtitle>ID: {{ getUser.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar>
                        <img :src="getUser.picture" alt="UserProfilePic"/>
                    </v-list-item-avatar>
                </v-list-item>
                <v-divider></v-divider>

                <v-list>
                    <v-list-group v-model="expandDetails" no-action>
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon v-text="detailFields[0].icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="detailFields[0].text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>

                        <v-list-item v-for="(item, i) in detailFields.slice(1)" :key="i" dense>
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list-group>

                </v-list>

                <div v-if="editable">
                    <v-select :items="possibleRoles" v-model="newUserRole" item-text="name" item-value="name"
                              label="New Role"></v-select>
                    <v-card-actions>
                        <v-btn @click="changeUserRole">Update Role</v-btn>
                        <v-btn @click="$store.commit('addPendingNotification', 'Sorry, this feature is not available yet')">
                            Reset password
                        </v-btn>
                        <v-btn @click.stop="confirmRemoveUser = true">Remove user</v-btn>
                        <v-btn v-if="isSelf" @click="logout">Logout</v-btn>
                    </v-card-actions>
                </div>
                <div v-else>
                    <v-card-actions>
                        <v-btn v-if="isSelf" @click="logout">Logout</v-btn>
                    </v-card-actions>
                </div>
            </v-container>
        </v-card>

        <v-dialog v-model="confirmRemoveUser" persistent max-width="600">
            <v-card>
                <v-card-title>Remove {{ getUser.name }}?</v-card-title>
                <v-card-text>This will remove this user. Content of that user, such as crumbs or votes, will not be
                    deleted. This operation can't be reversed!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="onCancelRemoveUser">Cancel</v-btn>
                    <v-btn @click="onConfirmRemoveUser">Delete User</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                confirmRemoveUser: false,
                expandDetails: false,
            };
        },
        computed: {
            isSelf: function () {
                return this.getUser.email === this.$auth.user.email;
            },
            possibleRoles: function () {
                return this.getRoles.filter((r) => r.name !== this.getUser.organizationRole);
            },
            detailFields: function () {
                return [
                    {text: `Name: ${this.getUser.name}`, icon: "face"},
                    {text: `Email: ${this.getUser.email}`, icon: "email"},
                    {text: `Role: ${this.getUser.organizationRole}`, icon: "admin_panel_settings"},
                    {text: `Created at: ${this.getUser.createdAt}`, icon: "av_timer"},
                    {text: `Last Login: ${this.getUser.lastLogin || 'Never'}`, icon: "restore"},
                    {text: `Logins: ${this.getUser.loginCount || '0'}`, icon: "timeline"},
                ];
            }
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
                    this.$store.commit("addPendingNotification", "Can't change the role of an user if no role is selected");
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
                this.confirmRemoveUser = false;
                this.$apollo.mutate({
                    mutation: require("../graphql/DeleteUser.gql"),
                    variables: {
                        userId: this.userId,
                    },
                });
            },
            onCancelRemoveUser() {
                console.log("Aborted deleting user", this.userId);
                this.confirmRemoveUser = false;
                this.$store.commit("addPendingNotification", "Removal of user cancelled");
            },
        },
    };
</script>
