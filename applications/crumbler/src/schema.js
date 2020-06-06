const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getCrumbs, getCrumb, createCrumb, upvoteCrumb } = require("./resolvers");

const typeDefs = gql`
    type Tag {
        key: String!
        value: String!
    }

    input TagInput {
        key: String!
        value: String!
    }

    type Crumb {
        id: ID
        title: String
        text: String
        type: String
        source: String
        votes: Int
        createdAt: String
        authorId: String
        tags: [Tag]
    }

    type Query {
        getCrumbs(type: String!): [Crumb]
        getCrumb(id: ID!): Crumb
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!, tags: [TagInput]): Crumb!
        upvoteCrumb(id: ID!): Crumb!
    }
`;

const resolvers = {
    Query: {
        getCrumbs: authRequired(getCrumbs, "read:questions"),
        getCrumb: authRequired(getCrumb, "read:questions"),
    },
    Mutation: {
        createCrumb: authRequired(createCrumb, "create:questions"),
        upvoteCrumb: authRequired(upvoteCrumb, "vote:questions"),
    },
};

module.exports = { typeDefs, resolvers };
