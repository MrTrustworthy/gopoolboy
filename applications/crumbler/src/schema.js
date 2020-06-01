const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { sayHello, getCrumbs, getCrumb, getLinkedCrumbs, createCrumb } = require("./resolvers");

const typeDefs = gql`
    type Crumb {
        id: ID
        title: String
        text: String
        type: String
        source: String
        votes: Int
        createdAt: String
        authorId: String
    }

    type Query {
        sayHello: String
        getCrumbs(type: String!): [Crumb]
        getCrumb(id: ID!): Crumb
        getLinkedCrumbs(id: ID!): [Crumb]
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!): Crumb!
    }
`;

const resolvers = {
    Query: {
        sayHello: sayHello,
        getCrumbs: authRequired(getCrumbs, "read:questions"),
        getCrumb: authRequired(getCrumb, "read:questions"),
        getLinkedCrumbs: authRequired(getLinkedCrumbs, "read:questions"),
    },
    Mutation: {
        createCrumb: authRequired(createCrumb, "create:questions"),
    },
};

module.exports = { typeDefs, resolvers };
