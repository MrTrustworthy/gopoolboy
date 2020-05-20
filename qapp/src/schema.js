const { gql } = require("apollo-server");
const authRequired = require("./validate");
const { getAnswersForQuestion, getQuestion, getQuestions, hello, upvoteQuestion } = require("./resolvers");

const typeDefs = gql`
    type Answer {
        id: ID
        text: String
        votes: Int
    }

    type Question {
        id: ID!
        title: String
        text: String
        votes: Int
        answerCount: Int
    }

    type Query {
        sayHello: String
        getQuestionTitles: [String]
        getQuestions: [Question]
        getQuestion(id: ID!): Question
        getAnswersForQuestion(id: ID!): [Answer]
    }

    type Mutation {
        upvoteQuestion(id: ID!): Question!
    }
`;

const resolvers = {
    Query: {
        sayHello: authRequired(hello),
        getQuestions: authRequired(getQuestions, "read:questions"),
        getQuestion: authRequired(getQuestion, "read:questions"),
        getAnswersForQuestion: authRequired(getAnswersForQuestion, "read:answers"),
    },
    Mutation: {
        upvoteQuestion: authRequired(upvoteQuestion, "vote:questions"),
    },
};

module.exports = { typeDefs, resolvers };
