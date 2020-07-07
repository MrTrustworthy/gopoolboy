const {gql} = require("apollo-server");
const {AuthenticationError} = require("apollo-server");
const {initialize, authRequired, PERMISSIONS} = require("@gopoolboy/auth");
const {getCrumb, getCrumbsWithTag, getCrumbsByAuthor, createCrumb, voteCrumb} = require("./resolvers");

initialize(process.env.AUTH0_DOMAIN, process.env.API_IDENTIFIER, AuthenticationError);

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
        getCrumbsWithTag(tag: ID!): [Crumb]
        getCrumbsByAuthor(authorId: String!): [Crumb]
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!, tags: [ID]!): Crumb!
        voteCrumb(id: ID!, vote: Int!): Crumb!
    }
`;

const resolvers = {
    Query: {
        getCrumb: authRequired(getCrumb, PERMISSIONS.READ_CRUMBS),
        getCrumbsWithTag: authRequired(getCrumbsWithTag, PERMISSIONS.READ_CRUMBS),
        getCrumbsByAuthor: authRequired(getCrumbsByAuthor, PERMISSIONS.READ_CRUMBS)

    },
    Mutation: {
        createCrumb: authRequired(createCrumb, PERMISSIONS.CREATE_CRUMBS),
        voteCrumb: authRequired(voteCrumb, PERMISSIONS.READ_CRUMBS),
    },
};

module.exports = {typeDefs, resolvers};
