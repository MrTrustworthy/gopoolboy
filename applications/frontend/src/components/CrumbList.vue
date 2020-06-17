<template>
    <v-list>
        <template v-for="crumbId of crumbIds">
            <CrumbSummary :key="crumbId" :id="crumbId" v-on:clicked-summary="clickedSummary"/>
            <v-divider inset :key="crumbId + '_inset'"></v-divider>
        </template>
    </v-list>
</template>

<script>
    import CrumbSummary from "@/components/CrumbSummary.vue";

    export default {
        name: "CrumbList",
        props: {
            crumbIds: Array,
        },
        components: {
            CrumbSummary,
        },
        methods: {
            clickedSummary(id) {
                this.$emit("clicked-summary", id);
            }
        }
    };
</script>
