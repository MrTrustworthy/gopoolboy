const knexClient = require('./knexclient');


async function getAnswersForQuestion(args, tenant) {
    return knexClient
        .from('answers')
        .select('id', 'text', 'votes')
        .where({'question_id': args.id})
}

function getQuestion(args, tenant) {
    return getQuestions(args, tenant).where({'questions.id': args.id}).first()
}

function getQuestions(args, tenant) {
    return knexClient
        .from('questions')
        .join('answers', {"questions.id": "answers.question_id"})
        .count('answers.id as answerCount')
        .select('questions.id', ' questions.title', 'questions.text', 'questions.votes')
        .groupBy('questions.id', ' questions.title', 'questions.text', 'questions.votes')
}

const hello = async (args, tenant) => {
    return "Hello World again!"
};

const upvoteQuestion = async (args, tenant) => {
    return knexClient('questions')
        .where({'id': args['id']})
        .increment('votes', 1)
        .then(() => getQuestion(args, tenant));
};

module.exports = {getAnswersForQuestion, getQuestion, getQuestions, upvoteQuestion, hello};