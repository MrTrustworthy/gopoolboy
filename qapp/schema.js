const {gql} = require('apollo-server');
const {getAnswersForQuestion, getQuestion, getQuestions} = require('./orm');
const isTokenValid = require('./validate')
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
        sayHello: hello,
        getQuestions: getQuestions,
        getQuestion: getQuestion,
        getAnswersForQuestion: getAnswersForQuestion
    }
};

async function hello(parent, args, context, info){
    let {error, decoded} = await isTokenValid(context['authToken']);
    return error ? "Nope, not you!" : "Hello World again!"
}

module.exports = {typeDefs, resolvers};