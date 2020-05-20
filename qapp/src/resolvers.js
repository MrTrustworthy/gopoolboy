const knexClient = require("./knexclient");

async function getAnswersForQuestion(args, organization) {
    return knexClient.from("answers").select("id", "text", "votes").where({ question_id: args.id });
}

function getQuestion(args, organization) {
    return getQuestions(args, organization).where({ "questions.id": args.id }).first();
}

function getQuestions(args, organization) {
    return knexClient
        .from("questions")
        .join("answers", { "questions.id": "answers.question_id" })
        .count("answers.id as answerCount")
        .select("questions.id", "questions.title", "questions.text", "questions.votes")
        .groupBy("questions.id", "questions.title", "questions.text", "questions.votes");
}

const hello = async (args, organization) => {
    return "Hello World again!";
};

const upvoteQuestion = async (args, organization) => {
    return knexClient("questions")
        .where({ id: args["id"] })
        .increment("votes", 1)
        .then(() => getQuestion(args, organization));
};

module.exports = {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    upvoteQuestion,
    hello,
};
