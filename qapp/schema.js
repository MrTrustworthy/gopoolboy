const {gql} = require('apollo-server');
const authRequired = require('./validate');
const {getAnswersForQuestion, getQuestion, getQuestions, hello} = require('./orm');

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

`;


const resolvers = {
    Query: {
        sayHello: authRequired(hello),
        getQuestions: authRequired(getQuestions),
        getQuestion: authRequired(getQuestion),
        getAnswersForQuestion: authRequired(getAnswersForQuestion)
    }
};




module.exports = {typeDefs, resolvers};