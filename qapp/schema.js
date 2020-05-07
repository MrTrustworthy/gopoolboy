const {gql} = require('apollo-server');
const {getAnswersForQuestion, getQuestion, getQuestions} = require('./orm');

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
    }`;


const resolvers = {
    Query: {
        sayHello: () => "Hello World!",
        getQuestions: getQuestions,
        getQuestion: getQuestion,
        getAnswersForQuestion: getAnswersForQuestion

    }
};

module.exports = {typeDefs, resolvers};