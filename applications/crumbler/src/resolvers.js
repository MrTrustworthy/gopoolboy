const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");
const assert = require("assert");

// Utilities

const selectMappings = {
    id: "crumbs.id",
    title: "crumbs.title",
    text: "crumbs.text",
    type: "crumbs.type",
    source: "crumbs.source",
    votes: "crumbs.votes",
    createdAt: "crumbs.created_at",
    authorId: "crumbs.creator_id",
    tags: "crumbs.tags",
};

const ensureCrumbInOrga = async (objectId, organization, user) => {
    let result = await knexClient("crumbs").select("organization_id").where({ id: objectId }).first();
    let orgaId = result.organization_id;
    if (orgaId !== organization) {
        console.log("Error when trying to access crumb with orgaId", orgaId, "as user from", organization);
        throw new AuthenticationError("Can't operate with this object as it's organization ID doesn't match");
    }
};

// Queries

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
const getLinkedCrumbIds = async (args, organization, user) => {
    return knexClient
        .from("crumblinks")
        .leftJoin("crumbs", { "crumblinks.to": "crumbs.id" })
        .where({ "crumblinks.from": args.id, "crumbs.organization_id": organization, "crumbs.type": args.type })
        .select({ id: "crumbs.id" })
        .then((res) => res.map((r) => r.id));
};

// Mutations

const createCrumb = async (args, organization, user) => {
    let type = args.type.toLowerCase();
    assert(["question", "answer"].indexOf(type) !== -1, "Type can't be: " + args.type);
    assert(type !== "answer" || args.linkTo, "Answers need to provide a link!");

    if (args.linkTo) return createLinkedAnswerCrumb(args, organization, user);
    return createQuestionCrumb(args, organization, user);
};

const createQuestionCrumb = (args, organization, user) => {
    let type = args.type.toLowerCase();

    return knexClient("crumbs")
        .insert({
            title: args.title,
            text: args.text,
            type: type,
            source: "web",
            organization_id: organization,
            creator_id: user,
            tags: JSON.stringify(args.tags),
        })
        .returning("id")
        .then(async (newCrumbIds) => getCrumb({ id: newCrumbIds[0] }, organization, user));
};

const createLinkedAnswerCrumb = async (args, organization, user) => {
    let type = args.type.toLowerCase();
    // need to save this here in the context to get it after the last transaction step
    let newCrumbId = null;

    await ensureCrumbInOrga(args.linkTo, organization, user);

    return knexClient
        .transaction(function (t) {
            return knexClient("crumbs")
                .transacting(t)
                .insert({
                    title: args.title,
                    text: args.text,
                    type: type,
                    source: "web",
                    organization_id: organization,
                    creator_id: user,
                    tags: JSON.stringify(args.tags),
                })
                .returning("id")
                .then(function (newCrumbIds) {
                    newCrumbId = newCrumbIds[0];
                    return knexClient("crumblinks").transacting(t).insert({
                        from: args.linkTo,
                        to: newCrumbId,
                        creator_id: user,
                    });
                })
                .then(t.commit)
                .catch(t.rollback);
        })
        .then(function (data) {
            return getCrumb({ id: newCrumbId }, organization, user);
        })
        .catch(function (data) {
            console.log("Failed to insert data:", args);
        });
};

const upvoteCrumb = async (args, organization, user) => {
    await ensureCrumbInOrga(args.id, organization, user);
    await knexClient("crumbs").where({ id: args.id }).increment("votes", 1);
    return getCrumb(args, organization, user);
};

module.exports = {
    getCrumbs,
    getCrumb,
    getLinkedCrumbIds,
    createCrumb,
    upvoteCrumb,
};
