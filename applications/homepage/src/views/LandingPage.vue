<template>
    <div id="landingpage">
        <span>Sign up now!</span>
        <NewOrganization/>
    </div>
</template>

<script>
    import NewOrganization from "../components/NewOrganization";

    export default {
        name: "LandingPage",
        components: {
            NewOrganization,
        },

    };
</script>
