const {gql} = require('apollo-server');
const authRequired = require('./validate');
const {getOrganizations, getUsers} = require('./orm');

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
        getOrganizations: [Organization]
        getUsers: [User]
    }

`;


const resolvers = {
    Query: {
        getOrganizations: authRequired(getOrganizations),
        getUsers: authRequired(getUsers)
    }
};




module.exports = {typeDefs, resolvers};