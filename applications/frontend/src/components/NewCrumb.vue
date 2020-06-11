<template>
    <md-card>
        <md-card-header>
            <div class="md-title">New {{ crumbTypeCapitalized }}</div>
        </md-card-header>

        <md-card-content>
            <md-field>
                <label>Title</label>
                <md-input v-model="newCrumbTitle" type="text" maxlength="120" md-autogrow></md-input>
            </md-field>
            <md-field>
                <label>Text</label>
                <md-textarea v-model="newCrumbText" type="text" md-autogrow></md-textarea>
            </md-field>
            <!-- Can use md-static-->
            <md-chips
                    class="md-primary pulse-on-error"
                    v-model="newCrumbTags"
                    :md-auto-insert="true"
                    md-check-duplicated
                    :md-format="formatTag"
                    placeholder="Tags as key:value"
            >
                <label>Tags as key:value</label>
            </md-chips>
        </md-card-content>

        <md-card-actions>
            <md-button @click="createCrumb" class="md-raised md-primary">Post {{ crumbType }}</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    import {fromId} from "@/urlids";

    export default {
        name: "NewCrumb",
        props: {
            crumbType: {
                type: String,
                required: true,
            },
            linkTo: {
                required: false,
                type: [String, Number],
            },
            confirmedActionEvent: {
                type: String,
                default: "confirmed-action",
            },
            failedActionEvent: {
                type: String,
                default: "failed-action",
            },
        },
        computed: {
            crumbTypeCapitalized: function () {
                return this.crumbType.charAt(0).toUpperCase() + this.crumbType.slice(1);
            },
        },
        data() {
            return {
                newCrumbTitle: "",
                newCrumbText: "",
                newCrumbTags: [],
            };
        },
        methods: {
            async createCrumb() {
                if (this.crumbType.toLowerCase() === "answer" && !this.linkTo) {
                    this.$store.commit("addPendingNotification", "Can't create answer-crumb with no link to anything!");
                    return;
                }
                const data = await this.$apollo
                    .mutate({
                        mutation: require("../graphql/CreateCrumb.gql"),
                        variables: {
                            title: this.newCrumbTitle,
                            text: this.newCrumbText,
                            type: this.crumbType,
                            tags: this.parseTags(),
                        },
                        client: "crumblerClient",
                    })
                let crumbId = data.data.createCrumb.id;

                if (!this.linkTo) {
                    this.$emit(this.confirmedActionEvent);
                    await this.$router.push({name: "crumbdetail", params: {id: fromId(crumbId)}});
                    return
                }
                await this.$apollo
                    .mutate({
                        mutation: require("../graphql/CreateCrumbLink.gql"),
                        variables: {
                            fromId: this.linkTo,
                            toId: crumbId,
                        },
                        client: "zeldaClient",
                    });
                this.$emit(this.confirmedActionEvent);

            },
            parseTags() {
                return this.newCrumbTags.map((tag) => ({key: tag.split(":")[0], value: tag.split(":")[1]}));
            },
            formatTag(str) {
                /*
                 * Turns arbitrary strings into "clean" tags
                 * "  hello YOU :   friend" -> "helloyou:friend"
                 * "whatsup" -> "whatsup:yes"
                 */
                if (!str) return "";
                let tag = str.replace(/ /g, "").toLowerCase();
                if (tag.indexOf(":") === -1) tag += ":yes";
                return tag;
            },
        },
    };
</script>
