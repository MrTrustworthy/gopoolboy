const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");

async function getAnswersForQuestion(args, organization) {
    return knexClient
        .from("answers")
        .select("id", "text", "votes")
        .where({ question_id: args.id, organization_id: organization });
}

function getQuestion(args, organization) {
    return getQuestions(args, organization)
        .where({ "questions.id": args.id, "questions.organization_id": organization })
        .first();
}

function getQuestions(args, organization) {
    return knexClient
        .from("questions")
        .join("answers", { "questions.id": "answers.question_id" })
        .count("answers.id as answerCount")
        .where({ "questions.organization_id": organization })
        .select("questions.id", "questions.title", "questions.text", "questions.votes")
        .groupBy("questions.id", "questions.title", "questions.text", "questions.votes");
}

const hello = async (args, organization) => {
    return "Hello World again!";
};

const upvoteQuestion = async (args, organization) => {
    let orgaId = await knexClient("questions").select("organization_id").where({ id: args["id"] }).first();

    if (orgaId.organization_id !== organization)
        throw new AuthenticationError("Cant upvote something not from your organization");

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
