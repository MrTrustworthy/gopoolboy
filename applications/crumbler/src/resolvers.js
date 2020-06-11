const knexClient = require("./knexclient");
const {AuthenticationError} = require("apollo-server");
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


// Queries


const getCrumbDataById = async (id, organization, user) => {
    let crumbData = await knexClient
        .from("crumbs")
        .where({organization_id: organization, id: id})
        .select(["id", "title", "text", "type", "source", "created_at", "creator_id", "tags"])
        .first();

    const voteData = await knexClient
        .from("upvotes")
        .where({organization_id: organization, crumb: crumbData.id})
        .sum({votes: "votes"})
        .first();

    const ownVote = await knexClient
        .from("upvotes")
        .where({organization_id: organization, crumb: crumbData.id, user: user})
        .sum({votes: "votes"})
        .first();

    return {
        id: crumbData.id,
        title: crumbData.title,
        text: crumbData.text,
        type: crumbData.type,
        source: crumbData.source,
        votes: voteData.votes || 0,
        ownVote: ownVote.votes || 0,
        authorId: crumbData.creator_id,
        createdAt: crumbData.created_at,
        tags: crumbData.tags
    };
};

// Mutations

const createCrumb = async (args, organization, user) => {
    let type = args.type.toLowerCase();

    let newIds = await knexClient("crumbs")
        .insert({
            title: args.title,
            text: args.text,
            type: type,
            source: "web",
            organization_id: organization,
            creator_id: user,
            tags: JSON.stringify(args.tags),
        })
        .returning("id");

    return getCrumbDataById(newIds[0], organization, user);
};

const voteCrumb = async (args, organization, user) => {
    if (![1, 0, -1].includes(args.vote)) throw new Error("Vote must be +/- 1!");
    console.log("Changing vote to", args.vote)
    await knexClient("upvotes")
        .where({organization_id: organization, user: user, crumb: args.id})
        .delete();

    if (args.vote !== 0) await knexClient("upvotes")
        .insert({
            crumb: args.id,
            votes: args.vote,
            user: user,
            organization_id: organization,
        });

    return getCrumbDataById(args.id, organization, user);
};


const getCrumb = async (args, organization, user) => {
    return getCrumbDataById(args.id, organization, user);
};

module.exports = {
    getCrumb,
    createCrumb,
    voteCrumb,
};
