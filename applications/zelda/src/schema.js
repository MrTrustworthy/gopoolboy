const {gql} = require("apollo-server");
const {AuthenticationError} = require("apollo-server");
const {initialize, authRequired, PERMISSIONS} = require("@gopoolboy/auth");
const {getLinkedCrumbIds, getCrumbLinkBetween, getCrumbLinksByAuthor, voteCrumbLink, createCrumbLink} = require("./resolvers");

initialize(process.env.AUTH0_DOMAIN, process.env.API_IDENTIFIER, AuthenticationError);

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
        getCrumbLinksByAuthor(authorId: String!): [CrumbLink]
    }

    type Mutation {
        createCrumbLink(fromId: ID!, toId: ID!): CrumbLink!
        voteCrumbLink(id: ID!, vote: Int!): CrumbLink!
    }
`;

const resolvers = {
    Query: {
        getLinkedCrumbIds: authRequired(getLinkedCrumbIds, PERMISSIONS.READ_CRUMBLINKS),
        getCrumbLinkBetween: authRequired(getCrumbLinkBetween, PERMISSIONS.READ_CRUMBLINKS),
        getCrumbLinksByAuthor: authRequired(getCrumbLinksByAuthor, PERMISSIONS.READ_CRUMBLINKS),
    },
    Mutation: {
        createCrumbLink: authRequired(createCrumbLink, PERMISSIONS.CREATE_CRUMBLINKS),
        voteCrumbLink: authRequired(voteCrumbLink, PERMISSIONS.READ_CRUMBLINKS),
    },
};

module.exports = {typeDefs, resolvers};
