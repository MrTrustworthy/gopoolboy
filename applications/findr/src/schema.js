const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { findCrumbs } = require("./resolvers");

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
        findCrumbs: authRequired(findCrumbs, "read:questions"),
    },
};

module.exports = { typeDefs, resolvers };
