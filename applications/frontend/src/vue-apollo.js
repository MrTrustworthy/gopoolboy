import Vue from "vue";
import VueApollo from "vue-apollo";
import {createApolloClient} from "vue-cli-plugin-apollo/graphql-client";

Vue.use(VueApollo);

// Config
const defaultOptions = {
    wsEndpoint: null,
    tokenName: process.env.VUE_APP_GRAPHQL_TOKEN_NAME,
    persisting: false,
    websocketsOnly: false,
    ssr: false,
};

const orgamonOptions = {
    httpEndpoint: process.env.VUE_APP_ORGAMON_GRAPHQL_HTTP,
};

const findrOptions = {
    httpEndpoint: process.env.VUE_APP_FINDR_GRAPHQL_HTTP,
};

const crumblerOptions = {
    httpEndpoint: process.env.VUE_APP_CRUMBLER_GRAPHQL_HTTP,
};

const zeldaOptions = {
    httpEndpoint: process.env.VUE_APP_ZELDA_GRAPHQL_HTTP,
};

export function createProvider() {
    const {apolloClient: orgamonClient} = createApolloClient({
        ...defaultOptions,
        ...orgamonOptions,
    });
    const {apolloClient: findrClient} = createApolloClient({
        ...defaultOptions,
        ...findrOptions,
    });
    const {apolloClient: crumblerClient} = createApolloClient({
        ...defaultOptions,
        ...crumblerOptions,
    });
    const {apolloClient: zeldaClient} = createApolloClient({
        ...defaultOptions,
        ...zeldaOptions,
    });
    return new VueApollo({
        clients: {orgamonClient, findrClient, crumblerClient, zeldaClient},
        defaultClient: crumblerClient,
        errorHandler(error) {
            console.log(
                "%cApolloError",
                "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
                error.message
            );
            if (error.message === "GraphQL error: TokenExpiredError: jwt expired") {
                this.$router.push({name: "welcome"});
            }
        },
    });
}
