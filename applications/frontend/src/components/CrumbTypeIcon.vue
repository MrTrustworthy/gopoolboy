<template>
    <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">
                {{ crumbType === "question" ? "help" : "announcement" }}
            </v-icon>
        </template>
        <span>{{ crumbTypeCapitalized }}</span>
    </v-tooltip>
</template>

<script>
    export default {
        name: "CrumbTypeIcon",
        props: {
            crumbType: {
                type: String,
                required: true
            }
        },
        computed: {
            crumbTypeCapitalized() {
                return this.crumbType[0].toUpperCase() + this.crumbType.slice(1);
            }
        }
    };
</script>

<style scoped>

</style>