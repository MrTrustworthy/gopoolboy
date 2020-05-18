const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getOrganization, getUsers, createOrganization } = require("./orm");

const typeDefs = gql`
    type Organization {
        id: ID
        name: String
    }

    type User {
        user_id: String
        name: String
        email: String
        tenant: String
        tenantRole: String
    }

    type Query {
        getOrganization: Organization
        getUsers: [User]
    }

    type Mutation {
        createOrganization(name: String!, creatorEmail: String!): Organization!
    }
`;

const resolvers = {
    Query: {
        getOrganization: authRequired(getOrganization),
        getUsers: authRequired(getUsers),
    },
    Mutation: {
        createOrganization: createOrganization,
    },
};

module.exports = { typeDefs, resolvers };
