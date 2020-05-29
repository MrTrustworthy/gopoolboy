const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");

// Private utility functions

// Scoping
const ensureQuestionInOrga = async (questionId, organization) => {
    let result = await knexClient("questions").select("organization_id").where({ id: questionId }).first();
    let orgaId = result.organization_id;
    console.log("ORGAs", orgaId, organization);
    if (orgaId !== organization) {
        console.log("Error when trying to access question with orgaId", orgaId, "as user from", organization);
        throw new AuthenticationError("Can't operate with question as it's organization ID doesn't match");
    }
};

// Answers
const getAnswersByQuestionId = async (id, organization) => {
    return knexClient
        .from("answers")
        .select("id", "text", "votes")
        .where({ question_id: id, organization_id: organization })
        .orderBy("votes", "desc");
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
    return knexClient
        .from("questions")
        .where({ organization_id: organization })
        .select("id", "title", "text", "votes")
        .orderBy("created_at", "desc");
};

// Exposed resolver functions

const getAnswersForQuestion = async (args, organization) => {
    return getAnswersByQuestionId(args.id, organization);
};

const getQuestion = async (args, organization) => {
    let question = await getQuestionById(args.id, organization);
    question.answers = await getAnswersByQuestionId(args.id, organization);
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

const createAnswer = async (args, organization, user) => {
    await ensureQuestionInOrga(args.questionId, organization);
    return knexClient("answers")
        .insert({
            text: args.text,
            question_id: args.questionId,
            organization_id: organization,
            creator_id: user,
        })
        .returning("id")
        .then(async (newAnswerIds) => getAnswerById(newAnswerIds[0], organization));
};

module.exports = {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    upvoteQuestion,
    createQuestion,
    createAnswer,
};
