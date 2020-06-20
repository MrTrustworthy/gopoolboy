<template>
    <v-container class="secondary">
        <span>{{ tags.length }} Tags:</span>
        <v-chip v-for="tag in tags" :key="tag.key + tag.value">
            {{ tag.key }}:{{ tag.value }}
        </v-chip>
    </v-container>
</template>

<script>
    export default {
        name: "Tags",
        props: {
            tags: {
                type: Array,
                required: true
            }
        }
    };
</script>
