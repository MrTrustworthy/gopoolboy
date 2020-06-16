<template>
    <md-list class="md-double-line md-dense">
        <template v-for="crumbId of crumbIds">
            <CrumbSummary :key="crumbId" :id="crumbId" v-on:clicked-summary="clickedSummary"/>
            <md-divider class="md-inset" :key="crumbId + '_inset'"></md-divider>
        </template>
    </md-list>
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
