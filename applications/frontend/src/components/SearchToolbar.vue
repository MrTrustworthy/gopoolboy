<template>
    <div>
        <SearchBar
                sort-by="relevance"
                crumb-type="all"
                v-on:found-ids="(ids) => crumbIds = ids"
                v-on:typed-like="updateSearch"
        />
        <v-menu absolute offset-y :value="showMenu" min-width="120" close-on-click close-on-content-click>
            <CrumbList :crumb-ids="crumbIds" v-on:clicked-summary="routeToFull"/>
        </v-menu>
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