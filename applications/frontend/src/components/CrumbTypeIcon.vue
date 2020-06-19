<template>
    <v-icon>{{ crumbType === "question" ? "help" : "announcement" }}</v-icon>
</template>

<script>
    export default {
        name: "CrumbTypeIcon",
        props: {
            crumbType: {
                type: String,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>