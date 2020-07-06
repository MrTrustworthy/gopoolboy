<template>
    <v-list>
        <v-list-item id="tab-home" :to="{name: 'home'}">
            <v-list-item-icon>
                <v-icon>search</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item id="tab-users" :to="{name: 'users'}">
            <v-list-item-icon>
                <v-icon>label</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
        </v-list-item>


    </v-list>
</template>
<script>
    export default {
        name: "NavigationBar",
        components: {},
    };
</script>
