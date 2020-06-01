const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");
const assert = require("assert");
const sayHello = async (args, organization) => {
    return "Hello World again!";
};

const selectMappings = {
    id: "id",
    title: "title",
    text: "text",
    type: "type",
    source: "source",
    votes: "votes",
    createdAt: "created_at",
    authorId: "creator_id",
};

const getCrumbs = async (args, organization, user) => {
    return knexClient.from("crumbs").where({ organization_id: organization }).select(selectMappings);
};
const getCrumb = async (args, organization, user) => {
    return knexClient
        .from("crumbs")
        .where({ organization_id: organization, id: args.id })
        .select(selectMappings)
        .first();
};
const getLinkedCrumbs = async (args, organization, user) => {
    return [];
};

const createCrumb = async (args, organization, user) => {
    assert(["question", "answer"].indexOf(args.type.toLowerCase()) !== -1, "Type can't be: " + args.type);
    return knexClient("crumbs")
        .insert({
            title: args.title,
            text: args.text,
            type: args.type.toLowerCase(),
            source: "web",
            organization_id: organization,
            creator_id: user,
        })
        .returning("id")
        .then(async (newCrumbIds) => getCrumb({ id: newCrumbIds[0] }, organization, user));
};

module.exports = {
    sayHello,
    getCrumbs,
    getCrumb,
    getLinkedCrumbs,
    createCrumb,
};
