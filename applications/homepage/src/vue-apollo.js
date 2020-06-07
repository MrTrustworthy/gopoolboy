import Vue from "vue";
import VueApollo from "vue-apollo";
import { createApolloClient } from "vue-cli-plugin-apollo/graphql-client";

Vue.use(VueApollo);

// Config
const defaultOptions = {
    wsEndpoint: null,
    persisting: false,
    websocketsOnly: false,
    ssr: false,
};

const orgamonOptions = {
    httpEndpoint: process.env.VUE_APP_ORGAMON_GRAPHQL_HTTP,
};


export function createProvider() {
    const { apolloClient: orgamonClient } = createApolloClient({
        ...defaultOptions,
        ...orgamonOptions,
    });

    return new VueApollo({
        clients: { orgamonClient },
        defaultClient: orgamonClient,
        errorHandler(error) {
            console.log(
                "%cApolloError",
                "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
                error.message,
            );
            if (error.message === "GraphQL error: TokenExpiredError: jwt expired") {
                this.$router.push({ name: "welcome" });
            }
        },
    });
}
