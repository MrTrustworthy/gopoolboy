const {gql} = require('apollo-server');
const authRequired = require('./validate');
const {getOrganization, getUsers} = require('./orm');

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

`;


const resolvers = {
    Query: {
        getOrganization: authRequired(getOrganization),
        getUsers: authRequired(getUsers)
    }
};

module.exports = {typeDefs, resolvers};