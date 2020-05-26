const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getOrganization, getUsers, createOrganization, inviteUser, getRoles, changeUserRole, deleteUser } = require("./resolvers");

const typeDefs = gql`
    type Organization {
        id: ID
        name: String
    }

    type Role {
        name: String
        description: String
    }

    type User {
        id: String
        name: String
        email: String
        organization: String
        organizationRole: String
    }

    type MutationResult {
        success: Boolean
    }

    type Query {
        getOrganization: Organization
        getUsers: [User]
        getRoles: [Role]
    }

    type Mutation {
        createOrganization(name: String!, creatorEmail: String!): Organization!
        inviteUser(email: String!, role: String!): User!
        changeUserRole(id: String!, role: String!): User!
        deleteUser(id: String!): MutationResult
    }
`;

const resolvers = {
    Query: {
        getOrganization: authRequired(getOrganization, "read:organization"),
        getUsers: authRequired(getUsers, "read:users"),
        getRoles: authRequired(getRoles, "read:users"),
    },
    Mutation: {
        createOrganization: createOrganization,
        inviteUser: authRequired(inviteUser, "create:users"),
        changeUserRole: authRequired(changeUserRole, "modify:users"),
        deleteUser: authRequired(deleteUser, "delete:users"),
    },
};

module.exports = { typeDefs, resolvers };
