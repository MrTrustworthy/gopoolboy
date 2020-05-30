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
        throw new AuthenticationError("Can't operate with this object as it's organization ID doesn't match");
    }
};

// Answers
const getAnswersByQuestionId = async (id, organization) => {
    let answers = await knexClient
        .from("answers")
        .select("id", "text", "votes", "created_at", "creator_id")
        .where({ question_id: id, organization_id: organization })
        .orderBy("votes", "desc");

    return Promise.all(answers.map(parseAnswer));
};

const getAnswerById = async (id, organization) => {
    let answer = await knexClient
        .from("answers")
        .where({ organization_id: organization, id: id })
        .select("id", "text", "votes")
        .first();
    return parseAnswer(answer);
};

const parseAnswer = async (answer) => {
    return {
        id: answer.id,
        text: answer.text,
        votes: answer.votes,
        createdAt: answer.created_at.toString(),
        authorId: answer.creator_id,
    };
};

// Questions
const getQuestionById = async (id, organization) => {
    let question = await knexClient
        .from("questions")
        .where({ id: id, organization_id: organization })
        .select("id", "title", "text", "votes", "created_at", "creator_id")
        .first();
    return parseQuestion(question);
};

const getQuestionsByOrganization = async (organization) => {
    let questions = await knexClient
        .from("questions")
        .where({ organization_id: organization })
        .select("id", "title", "text", "votes", "created_at", "creator_id")
        .orderBy("created_at", "desc");
    return Promise.all(questions.map(parseQuestion));
};

const parseQuestion = async (question) => {
    return {
        id: question.id,
        text: question.text,
        title: question.title,
        votes: question.votes,
        createdAt: question.created_at.toString(),
        authorId: question.creator_id,
    };
};

// Exposed query functions

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

// Exposed mutation function

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
