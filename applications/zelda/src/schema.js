const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getLinkedCrumbIds, upvoteCrumbLink, createCrumbLink } = require("./resolvers");

const typeDefs = gql`
    type CrumbLink {
        id: ID!
        links: [ID]
        votes: Int
        authorId: String
        createdAt: String
    }

    type Query {
        getLinkedCrumbIds(id: ID!): [ID!]
    }

    type Mutation {
        createCrumbLink(from: ID!, to: ID!): CrumbLink!
        upvoteCrumbLink(id: ID!): CrumbLink!
    }
`;

const resolvers = {
    Query: {
        getLinkedCrumbIds: authRequired(getLinkedCrumbIds, "read:questions"),
    },
    Mutation: {
        createCrumbLink: authRequired(createCrumbLink, "create:questions"),
        upvoteCrumbLink: authRequired(upvoteCrumbLink, "vote:questions"),
    },
};

module.exports = { typeDefs, resolvers };
