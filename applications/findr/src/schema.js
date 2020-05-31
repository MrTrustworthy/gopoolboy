const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { findQuestions } = require("./resolvers");

const typeDefs = gql`
    type QuestionResult {
        questionId: ID
    }

    type Query {
        findQuestions(like: String!): [QuestionResult]
    }
`;

const resolvers = {
    Query: {
        findQuestions: authRequired(findQuestions, "read:questions"),
    },
};

module.exports = { typeDefs, resolvers };
