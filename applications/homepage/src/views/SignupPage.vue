<template>
    <div id="landingpage">
        <NewOrganization/>
    </div>
</template>

<script>
    import NewOrganization from "../components/NewOrganization";
    export default {
        name: "SignupPage",
        components: {
            NewOrganization,
        },
    };
</script>
