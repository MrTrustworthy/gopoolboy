const knexClient = require('./knexclient');
const isTokenValid = require('./validate')


async function getAnswersForQuestion(parent, args, context, info) {
    //let {error, decoded} = await isTokenValid(context['authToken']);
    //if (error) return [];
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
        .select('questions.id', ' questions.title', 'questions.text', 'questions.votes')
        .groupBy('questions.id', ' questions.title', 'questions.text', 'questions.votes')
}

const hello = async (parent, args, context, info) => {
    let {error, decoded} = await isTokenValid(context['authToken']);
    return error ? "Nope, not you!" : "Hello World again!"
};

module.exports = {getAnswersForQuestion, getQuestion, getQuestions, hello};