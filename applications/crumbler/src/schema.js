const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { sayHello } = require("./resolvers");

const typeDefs = gql`
    type Crumb {
        id: ID
        text: String
        votes: Int
        createdAt: String
        authorId: String
    }

    type Query {
        sayHello: String
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!): String!
    }
`;

const resolvers = {
    Query: {
        sayHello: sayHello,
    },
    Mutation: {
        createCrumb: sayHello,
    },
};

module.exports = { typeDefs, resolvers };
