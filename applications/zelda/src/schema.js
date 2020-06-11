const {gql} = require("apollo-server");
const authRequired = require("./validate");
const {getLinkedCrumbIds, getCrumbLinkBetween, voteCrumbLink, createCrumbLink} = require("./resolvers");

const typeDefs = gql`
        
    type CrumbLink {
        id: ID!
        links: [ID]
        votes: Int
        ownVote: Int
        authorId: String
        createdAt: String
    }

    type Query {
        getLinkedCrumbIds(id: ID!): [ID!]
        getCrumbLinkBetween(fromId: ID!, toId: ID!): CrumbLink
    }

    type Mutation {
        createCrumbLink(fromId: ID!, toId: ID!): CrumbLink!
        voteCrumbLink(id: ID!, vote: Int!): CrumbLink!
    }
`;

const resolvers = {
    Query: {
        getLinkedCrumbIds: authRequired(getLinkedCrumbIds, "read:questions"),
        getCrumbLinkBetween: authRequired(getCrumbLinkBetween, "read:questions"),

    },
    Mutation: {
        createCrumbLink: authRequired(createCrumbLink, "create:questions"),
        voteCrumbLink: authRequired(voteCrumbLink, "vote:questions"),
    },
};

module.exports = {typeDefs, resolvers};
