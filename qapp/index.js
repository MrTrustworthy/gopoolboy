const {ApolloServer, gql} = require('apollo-server');
const knexClient = require('./knexclient');


// Construct a schema, using GraphQL schema language
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

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        sayHello: () => "Hello World!",
        getQuestionTitles: () => knexClient('questions').select('title').then(rows => rows.map(r => r["title"])),
        getQuestions: getQuestions,
        getQuestion: getQuestion,
        getAnswersForQuestion: getAnswersForQuestion

    }
};

function getAnswersForQuestion(parent, args, context, info) {
  return knexClient
      .from('answers')
      .select('id', 'text', 'votes')
      .where({'question_id': args.id})
}

function getQuestion(parent, args, context, info) {
  return getQuestions().where({'questions.id': args.id}).first()
}

function getQuestions() {
    return knexClient
        .from('questions')
        .join('answers', {"questions.id": "answers.question_id"})
        .count('answers.id as answerCount')
        .select('questions.id',' questions.title', 'questions.text', 'questions.votes')
        .groupBy('questions.id',' questions.title', 'questions.text', 'questions.votes')
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});

