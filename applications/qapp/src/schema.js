const { gql } = require("apollo-server");
const authRequired = require("./validate");
const {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    createQuestion,
    upvoteQuestion,
    createAnswer,
    upvoteAnswer,
} = require("./resolvers");

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
        answers: [Answer!]
    }

    type Query {
        sayHello: String
        getQuestionTitles: [String]
        getQuestions: [Question]
        getQuestion(id: ID!): Question
        getAnswersForQuestion(id: ID!): [Answer]
    }

    type Mutation {
        createQuestion(title: String!, text: String!): Question!
        upvoteQuestion(id: ID!): Question!
        createAnswer(questionId: ID!, text: String!): Answer!
        upvoteAnswer(id: ID!): Answer!
    }
`;

const sayHello = async (args, organization) => {
    return "Hello World again!";
};

const resolvers = {
    Query: {
        sayHello: sayHello,
        getQuestions: authRequired(getQuestions, "read:questions"),
        getQuestion: authRequired(getQuestion, "read:questions"),
        getAnswersForQuestion: authRequired(getAnswersForQuestion, "read:answers"),
    },
    Mutation: {
        createQuestion: authRequired(createQuestion, "create:questions"),
        upvoteQuestion: authRequired(upvoteQuestion, "vote:questions"),
        createAnswer: authRequired(createAnswer, "create:answers"),
        upvoteAnswer: authRequired(upvoteAnswer, "vote:answers"),
    },
};

module.exports = { typeDefs, resolvers };
