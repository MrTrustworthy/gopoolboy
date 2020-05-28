const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");

// Private utility functions
const ensureQuestionInOrga = async (questionId, organization) => {
    let orgaId = await knexClient("questions").select("organization_id").where({ id: questionId }).first();
    if (orgaId.organization_id !== organization)
        throw new AuthenticationError("Can't operate with question as it's organization ID doesn't match");
};

const getQuestionById = async (id, organization) => {
    return knexClient
        .from("questions")
        .join("answers", { "questions.id": "answers.question_id" })
        .count("answers.id as answerCount")
        .where({ "questions.id": id, "questions.organization_id": organization })
        .select("questions.id", "questions.title", "questions.text", "questions.votes")
        .groupBy("questions.id", "questions.title", "questions.text", "questions.votes")
        .first();
};

const getAnswerById = async (id, organization) => {
    return knexClient
        .from("answers")
        .where({ organization_id: organization, id: id })
        .select("id", "text", "votes")
        .first();
};

const getAnswersByQuestionId = async (id, organization) => {
    return knexClient
        .from("answers")
        .select("id", "text", "votes")
        .where({ question_id: id, organization_id: organization });
};

const getQuestionsByOrganization = async (organization) => {
    return knexClient
        .from("questions")
        .join("answers", { "questions.id": "answers.question_id" })
        .count("answers.id as answerCount")
        .where({ "questions.organization_id": organization })
        .select("questions.id", "questions.title", "questions.text", "questions.votes")
        .groupBy("questions.id", "questions.title", "questions.text", "questions.votes");
};

// Exposed resolver functions
const getAnswersForQuestion = async (args, organization) => {
    return getAnswersByQuestionId(args.id, organization);
};

const getQuestion = async (args, organization) => {
    return getQuestionById(args.id, organization);
};

const getQuestions = async (args, organization) => {
    return getQuestionsByOrganization(organization);
};

const upvoteQuestion = async (args, organization) => {
    await ensureQuestionInOrga(args.id, organization);
    await knexClient("questions").where({ id: args.id }).increment("votes", 1);
    return getQuestion(args, organization);
};

const addQuestion = async (args, organization, user) => {
    let newQuestionIds = await knex("questions")
        .insert({
            title: args.title,
            text: args.text,
            organization_id: organization,
            creator_id: user,
        })
        .returning("id");
    return getQuestionById(newQuestionIds[0], organization);
};

const addAnswer = async (args, organization) => {
    let newAnswerIds = await knex("answers")
        .insert({
            text: args.text,
            organization_id: organization,
            creator_id: user,
        })
        .returning("id");
    return getAnswerById(newAnswerIds[0], organization);
};

module.exports = {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    upvoteQuestion,
    addQuestion,
    addAnswer,
};
