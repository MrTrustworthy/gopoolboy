const knexClient = require("./knexclient");

const selectMappings = {
    id: "crumblinks.id",
    links: "crumblinks.to",
    votes: "crumblinks.votes",
    createdAt: "crumblinks.created_at",
    authorId: "crumblinks.creator_id",
};

const getCrumbLink = async (args, organization, user) => {
    return knexClient
        .from("crumblinks")
        .where({ organization_id: organization, id: args.id })
        .select(selectMappings)
        .first();
};

const getLinkedCrumbIds = async (args, organization, user) => {
    return knexClient
        .from("crumblinks")
        .where({ from: args.id, organization_id: organization })
        .select("to")
        .then((res) => res.map((r) => r.to));
};

// Mutations

const createCrumbLink = async (args, organization, user) => {
    return knexClient("crumblinks")
        .insert({
            from: args.from,
            to: args.to,
            creator_id: user,
            organization_id: organization,
        }).returning("id")
        .then(async (newIds) => getCrumbLink({ id: newIds[0] }, organization, user));
};

const upvoteCrumbLink = async (args, organization, user) => {
    return knexClient("crumbs")
        .where({ id: args.id })
        .increment("votes", 1)
        .then(() => getCrumb(args, organization, user));
};

module.exports = {
    getLinkedCrumbIds,
    createCrumbLink,
    upvoteCrumbLink,
};
