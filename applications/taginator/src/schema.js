const {gql} = require("apollo-server");
const authRequired = require("./validate");
const {getTagsByIds, getAllTags, createTag} = require("./resolvers");

const typeDefs = gql`
    type Tag {
        id: ID!
        name: String!
        value: String!
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
        getTagsByIds: authRequired(getTagsByIds, "read:questions"),
        getAllTags: authRequired(getAllTags, "read:questions")
    },
    Mutation: {
        createTag: authRequired(createTag, "create:questions"),
    },
};

module.exports = {typeDefs, resolvers};
