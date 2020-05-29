const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");
const assert = require("assert");

// Private utility functions

// Scoping
const ensureObjectInOrga = async (objectId, organization, type = "question") => {
    assert(["question", "answer"].indexOf(type) !== -1, "ensureObjectInOrga can't be used with type " + type);
    let result = await knexClient(type + "s")
        .select("organization_id")
        .where({ id: objectId })
        .first();
    let orgaId = result.organization_id;
    if (orgaId !== organization) {
        console.log("Error when trying to access", type, "with orgaId", orgaId, "as user from", organization);
        console.log("Types are", typeof orgaId, "and", typeof organization);
        throw new AuthenticationError("Can't operate with this object as it's organization ID doesn't match");
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

const upvoteQuestion = async (args, organization) => {
    await ensureObjectInOrga(args.id, organization, "question");
    await knexClient("questions").where({ id: args.id }).increment("votes", 1);
    return getQuestion(args, organization);
};

const createAnswer = async (args, organization, user) => {
    await ensureObjectInOrga(args.questionId, organization, "question");
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

const upvoteAnswer = async (args, organization) => {
    await ensureObjectInOrga(args.id, organization, "answer");
    await knexClient("answers").where({ id: args.id }).increment("votes", 1);
    return getAnswerById(args.id, organization);
};

module.exports = {
    getAnswersForQuestion,
    getQuestion,
    getQuestions,
    createQuestion,
    upvoteQuestion,
    createAnswer,
    upvoteAnswer,
};
