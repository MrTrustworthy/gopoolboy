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
    import { fromId } from "@/urlids";

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
            createCrumb() {
                if (this.crumbType.toLowerCase() === "answer" && !this.linkTo) {
                    console.error("Can't create answer-crumb with no link to anything!");
                    return;
                }
                this.$apollo
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
                    .then((data) => {
                        let crumbId = data.data.createCrumb.id;
                        console.log("New crumb created with id", crumbId);
                        this.$emit(this.confirmedActionEvent);
                        if (this.crumbType.toLowerCase() === "question") {
                            this.$router.push({ name: "crumbdetail", params: { id: fromId(crumbId) } });
                        } else if (this.crumbType.toLowerCase() === "answer") {
                            this.$apollo
                                .mutate({
                                    mutation: require("../graphql/CreateCrumbLink.gql"),
                                    variables: {
                                        from: this.linkTo,
                                        to: crumbId,
                                    },
                                    client: "zeldaClient",
                                });
                        } else {
                            console.error("Can't proceed with new crumb of type:", this.crumbType);
                        }

                    })
                    .catch((data) => {
                        console.log("Failed to create crumb!", data);
                        this.$emit(this.failedActionEvent);
                    });
            },
            parseTags() {
                return this.newCrumbTags.map((tag) => ({ key: tag.split(":")[0], value: tag.split(":")[1] }));
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
