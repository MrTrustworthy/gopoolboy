const { gql } = require("apollo-server");
const authRequired = require("./validate");
const {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    upvoteQuestion,
    addQuestion,
    addAnswer,
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
        addQuestion(title: String!, text: String!): Question!
        addAnswer(questionId: ID!, text: String!): Answer!
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
        upvoteQuestion: authRequired(upvoteQuestion, "vote:questions"),
        addQuestion: authRequired(addQuestion, "create:questions"),
        addAnswer: authRequired(addAnswer, "create:answers"),
    },
};

module.exports = { typeDefs, resolvers };
