const {gql} = require("apollo-server");
const {AuthenticationError} = require("apollo-server");
const {initialize, authRequired, PERMISSIONS} = require("@gopoolboy/auth");

initialize(process.env.AUTH0_DOMAIN, process.env.API_IDENTIFIER, AuthenticationError);

const {
    getOrganization,
    getUsers,
    getUser,
    createOrganization,
    inviteUser,
    getRoles,
    changeUserRole,
    deleteUser,
} = require("./resolvers");

const typeDefs = gql`
    type Organization {
        id: ID
        name: String
        createdAt: String
    }

    type Role {
        name: String
        description: String
    }

    type User {
        id: String
        name: String
        nickname: String
        email: String
        emailVerified: Boolean
        picture: String
        organization: String
        organizationRole: String
        lastLogin: String
        createdAt: String
        loginCount: Int
    }

    type MutationResult {
        success: Boolean
        message: String
    }

    type Query {
        getOrganization: Organization
        getUsers: [User]
        getUser(id: String!): User
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
        getOrganization: authRequired(getOrganization, PERMISSIONS.READ_ORGANIZATION),
        getUsers: authRequired(getUsers, PERMISSIONS.READ_USERS),
        getUser: authRequired(getUser, PERMISSIONS.READ_USERS),
        getRoles: authRequired(getRoles, PERMISSIONS.READ_USERS),
    },
    Mutation: {
        createOrganization: createOrganization,
        inviteUser: authRequired(inviteUser, PERMISSIONS.CREATE_USERS),
        changeUserRole: authRequired(changeUserRole, PERMISSIONS.MODIFY_USERS),
        deleteUser: authRequired(deleteUser, PERMISSIONS.DELETE_USERS),
    },
};

module.exports = {typeDefs, resolvers};
