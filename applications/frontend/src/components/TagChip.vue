<template>
    <v-chip :color="colorForId(tag.id)">
        {{ tag.name }}:{{ tag.value }}
    </v-chip>
</template>

<script>
    export default {
        name: "TagChip",
        props: {
            tag: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            };
        },
        methods: {
            colorForId(id) {
                return this.colors[id % this.colors.length];
            },
        },
    };
</script>

<style scoped>

</style>