<template>
    <div class="md-layout md-gutter md-layout-nowrap">
            <div class="md-layout-item" v-for="plan of plans" :key="plan.name">
                <md-card>
                    <md-card-header>
                        <div class="md-title">{{ plan.name }}</div>
                        <div class="md-subhead">{{ plan.price }}</div>
                        <div class="md-subhead">{{ plan.details }}</div>

                    </md-card-header>

                    <md-card-content>
                        <md-list>
                            <md-list-item v-for="item of plan.items" :key="item">
                                <md-icon>whatshot</md-icon>
                                <span class="md-list-item-text">{{ item }}</span>
                            </md-list-item>
                        </md-list>
                    </md-card-content>

                    <md-card-actions md-alignment="right">
                        <md-button class="md-primary" to="/signup">Try 14 days for free!</md-button>
                    </md-card-actions>
                </md-card>
            </div>
    </div>
</template>

<script>
    export default {
        name: "Pricing",
        data() {
            return {
                plans: {
                    basic: {
                        name: "Basic",
                        price: "$6/User/month",
                        details: "5 user minimum",
                        items: [
                            "Connect to >X tools like Slack, Confluence, Google Mail, Git, and many more",
                            "ML-Supported recommendations for easy blah",
                            "Question/Answer module",
                            "Advanced discovery mode",
                            "Basic user and permission management",
                            "Free cookie!",
                        ],
                    },
                    enterprise: {
                        name: "Enterprise",
                        price: "$11/User/month",
                        details: "25 user minimum",
                        items: [
                            "Everything in the Advanced plan PLUS",
                            "Authentication via SAML or OAuth",
                            "Fine-grained permission management on tags",
                        ],
                    },
                },
            };
        },
    };
</script>

<style scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
