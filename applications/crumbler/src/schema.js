const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getCrumb, getAllTags, createCrumb, voteCrumb } = require("./resolvers");

const typeDefs = gql`
    type Tag {
        key: String!
        value: String!
    }

    input TagInput {
        key: String!
        value: String!
    }

    type Crumb {
        id: ID
        title: String
        text: String
        type: String
        source: String
        votes: Int
        ownVote: Int
        createdAt: String
        authorId: String
        tags: [Tag]
    }

    type Query {
        getCrumb(id: ID!): Crumb
        getAllTags: [Tag]
    }

    type Mutation {
        createCrumb(title: String!, text: String!, type: String!, tags: [TagInput]): Crumb!
        voteCrumb(id: ID!, vote: Int!): Crumb!
    }
`;

const resolvers = {
    Query: {
        getCrumb: authRequired(getCrumb, "read:questions"),
        getAllTags: authRequired(getAllTags, "read:questions")
    },
    Mutation: {
        createCrumb: authRequired(createCrumb, "create:questions"),
        voteCrumb: authRequired(voteCrumb, "vote:questions"),
    },
};

module.exports = { typeDefs, resolvers };
