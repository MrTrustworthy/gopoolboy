<template>
    <div id="welcome">
        <SignUpIn />
        <NewOrganization />
    </div>
</template>

<script>
import SignUpIn from "@/components/SignUpIn.vue";
import NewOrganization from "@/components/NewOrganization.vue";

export default {
    name: "Home",
    components: {
        SignUpIn,
        NewOrganization,
    },
};
</script>
