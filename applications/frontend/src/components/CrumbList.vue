<template>
    <div>
        <md-list class="md-double-line md-dense">
            <template v-for="crumbId of crumbIds">

                <CrumbSummary :key="crumbId" v-bind:id="crumbId"/>
                <md-divider class="md-inset" :key="crumbId + '_inset'"></md-divider>
            </template>
        </md-list>
    </div>
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
    };
</script>
