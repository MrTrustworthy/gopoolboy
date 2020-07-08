<template>
    <v-chip :color="colorForId(tag.id)" @click="openDetailView">
        {{ tag.name }}:{{ tag.value }}
    </v-chip>
</template>

<script>
    import {encodeId} from "@/urlids";

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
            openDetailView() {
                this.$router.push({name: "tagdetail", params: {id: encodeId(this.tag.id)}});
            }
        },
    };
</script>

<style scoped>

</style>