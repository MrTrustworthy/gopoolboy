const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");

// Private utility functions

// Scoping
const ensureQuestionInOrga = async (questionId, organization) => {
    let orgaId = await knexClient("questions").select("organization_id").where({ id: questionId }).first();
    if (orgaId.organization_id !== organization)
        throw new AuthenticationError("Can't operate with question as it's organization ID doesn't match");
};

// Answers
const getAnswerCountForQuestionId = async (id, organization) => {
    return knexClient
        .from("answers")
        .where({ question_id: id, organization_id: organization })
        .count("id as answerCount")
        .first()
        .then((v) => v.answerCount);
};

const getAnswersByQuestionId = async (id, organization) => {
    return knexClient
        .from("answers")
        .select("id", "text", "votes")
        .where({ question_id: id, organization_id: organization });
};

const getAnswerById = async (id, organization) => {
    return knexClient
        .from("answers")
        .where({ organization_id: organization, id: id })
        .select("id", "text", "votes")
        .first();
};

// Questions
const getQuestionById = async (id, organization) => {
    return knexClient
        .from("questions")
        .where({ id: id, organization_id: organization })
        .select("id", "title", "text", "votes")
        .first();
};

const getQuestionsByOrganization = async (organization) => {
    return knexClient.from("questions").where({ organization_id: organization }).select("id", "title", "text", "votes");
};

// Exposed resolver functions

const getAnswersForQuestion = async (args, organization) => {
    return getAnswersByQuestionId(args.id, organization);
};

const getQuestion = async (args, organization) => {
    let question = await getQuestionById(args.id, organization);
    question.answers = getAnswersByQuestionId(args.id, organization);
    return question;
};

const getQuestions = async (args, organization) => {
    let mapper = async (question) => {
        question.answers = await getAnswersByQuestionId(question.id, organization);
        return question;
    };
    let questions = await getQuestionsByOrganization(organization);
    return Promise.all(questions.map(mapper));
};

const upvoteQuestion = async (args, organization) => {
    await ensureQuestionInOrga(args.id, organization);
    await knexClient("questions").where({ id: args.id }).increment("votes", 1);
    return getQuestion(args, organization);
};

const createQuestion = async (args, organization, user) => {
    return knexClient("questions")
        .insert({
            title: args.title,
            text: args.text,
            organization_id: organization,
            creator_id: user,
        })
        .returning("id")
        .then(async (newQuestionIds) => getQuestionById(newQuestionIds[0], organization));
};

const createAnswer = async (args, organization) => {
    let newAnswerIds = await knexClient("answers")
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
    createQuestion,
    createAnswer,
};
