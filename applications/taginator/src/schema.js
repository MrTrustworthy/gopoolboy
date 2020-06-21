const {gql} = require("apollo-server");
const {AuthenticationError} = require("apollo-server");
const {initialize, authRequired, PERMISSIONS} = require("@gopoolboy/auth");
const {getTagsByIds, getAllTags, createTag} = require("./resolvers");

initialize(process.env.AUTH0_DOMAIN, process.env.API_IDENTIFIER, AuthenticationError);

const typeDefs = gql`
    type Tag {
        id: ID!
        name: String!
        value: String!
        authorId: String
    }

    input TagInput {
        name: String!
        value: String!
    }

    type Query {
        getTagsByIds(ids: [ID]!): [Tag]
        getAllTags: [Tag]
    }

    type Mutation {
        createTag(tagInput: TagInput!): Tag!
    }
`;

const resolvers = {
    Query: {
        getTagsByIds: authRequired(getTagsByIds, PERMISSIONS.READ_TAGS),
        getAllTags: authRequired(getAllTags, PERMISSIONS.READ_TAGS)
    },
    Mutation: {
        createTag: authRequired(createTag, PERMISSIONS.CREATE_TAGS),
    },
};

module.exports = {typeDefs, resolvers};
