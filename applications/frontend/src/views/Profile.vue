<template>
    <div id="profile">

        <v-tabs v-model="tab" background-color="primary">
            <v-tab> Profile</v-tab>

            <v-tab> Activity</v-tab>
        </v-tabs>
        <br>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <ProfileDetail :userId="userId" :editable="false" :expanded="true"/>
            </v-tab-item>

            <v-tab-item>
                <CrumbTimeline :authorId="userId"/>
            </v-tab-item>
        </v-tabs-items>


    </div>
</template>

<script>
    import ProfileDetail from "@/components/ProfileDetail.vue";
    import CrumbTimeline from "../components/CrumbTimeline";

    export default {
        name: "Profile",
        components: {
            CrumbTimeline,
            ProfileDetail,
        },
        data() {
            return {
                getUser: {},
                userId: this.$route.params.userId,
                items: [{tab: "tab", content: "test"}, {tab: "tab2", content: "test2"}],
                tab: null
            };
        },
        watch: {
            $route(to) {
                this.userId = to.params.userId;
            },
        },
    };
</script>
