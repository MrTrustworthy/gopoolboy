const {gql} = require('apollo-server');
const authRequired = require('./validate');
const {getOrganizations} = require('./orm');

const typeDefs = gql`
    type Organization {
        id: ID
        name: String
    }

    type Query {
        getOrganizations: [Organization]
    }

`;


const resolvers = {
    Query: {
        getOrganizations: authRequired(getOrganizations),
    }
};




module.exports = {typeDefs, resolvers};