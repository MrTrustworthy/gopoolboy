const {gql} = require("apollo-server");
const authRequired = require("./validate");
const {getCrumb, createCrumb, voteCrumb} = require("./resolvers");

const typeDefs = gql`

    type Crumb {
        id: ID
        title: String
        text: String
        type: String
        source: String
        votes: Int
        ownVote: Int
        createdAt: String
        authorId: String
        tags: [ID]
    }

    type Query {
        getCrumb(id: ID!): Crumb
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!, tags: [ID]!): Crumb!
        voteCrumb(id: ID!, vote: Int!): Crumb!
    }
`;

const resolvers = {
    Query: {
        getCrumb: authRequired(getCrumb, "read:questions"),
    },
    Mutation: {
        createCrumb: authRequired(createCrumb, "create:questions"),
        voteCrumb: authRequired(voteCrumb, "vote:questions"),
    },
};

module.exports = {typeDefs, resolvers};
