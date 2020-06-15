<template>
    <div>
        <SearchBar
                sort-by="relevance"
                crumb-type="all"
                v-on:found-ids="(ids) => crumbIds = ids"
                v-on:typed-like="updateSearch"
        />
        <md-menu md-size="medium" md-align-trigger :md-active="showMenu">
            <md-menu-content>
                <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="routeToFull"/>
            </md-menu-content>
        </md-menu>

    </div>
</template>

<script>
    import CreateWidgetSnackbar from "@/components/Speeddial.vue";
    import CrumbList from "../components/CrumbList";
    import SearchCrumb from "./SearchCard";
    import {fromId} from "@/urlids";
    import SearchBar from "./SearchBar";

    export default {
        name: "SearchToolbar",
        data() {
            return {
                crumbIds: [],
                currentLike: ""
            };
        },
        components: {
            SearchBar,
            CrumbList,
        },
        computed: {
            showMenu() {
                return this.crumbIds.length > 0 && this.currentLike.length > 0;
            }
        },
        methods: {
            routeToFull(id) {
                this.currentLike = "";
                console.log("Routing to id", id);
                this.$router.push({name: "crumbdetail", params: {id: fromId(id)}});
            },
            updateSearch(newLike) {
                this.currentLike = newLike;
            }
        }
    };
</script>
<style scoped>
    .md-menu {
        min-width: 80%
    }
</style>