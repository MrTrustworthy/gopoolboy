<template>
    <v-tooltip top open-delay="150">
        <template v-slot:activator="{ on, attrs }">

            <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-icon v-if="showIcon">
                    <v-icon>av_timer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ relativeMicrosTS(timestamp) }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </template>
        <span>{{ prettyTime(timestamp) }}</span>
    </v-tooltip>
</template>

<script>
    import moment from "moment";

    export default {
        name: "CreatedAListItemt",
        props: {
            timestamp: {
                type: String,
                default: "0"
            },
            showIcon: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            relativeMicrosTS(ts) {
                return moment(ts, "x").fromNow();
            },
            prettyTime(ts) {
                return moment(ts, "x").format("dddd, MMMM Do YYYY, h:mm:ss a");
            },
        }
    };
</script>

<style scoped>

</style>