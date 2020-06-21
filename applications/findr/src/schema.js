const {gql} = require("apollo-server");
const {AuthenticationError} = require("apollo-server");
const {initialize, authRequired, PERMISSIONS} = require("@gopoolboy/auth");
const {findCrumbs} = require("./resolvers");

initialize(process.env.AUTH0_DOMAIN, process.env.API_IDENTIFIER, AuthenticationError);


const typeDefs = gql`
    type QueryResult {
        id: ID
    }

    type Query {
        findCrumbs(type: String!, like: String!, sortBy: String): [QueryResult]
    }
`;

const resolvers = {
    Query: {
        findCrumbs: authRequired(findCrumbs, PERMISSIONS.READ_CRUMBS),
    },
};

module.exports = {typeDefs, resolvers};
