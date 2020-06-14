const knexClient = require("./knexclient");
const {logger} = require("./log");

// Object builder

const getCrumbLinkDataById = async (id, organization, user) => {
    logger.info("Getting crumblink by ID", {id, organization, user});

    const linkData = await knexClient
        .from("crumblinks")
        .where({organization_id: organization, id: id})
        .select("id", "from", "to", "created_at", "creator_id")
        .first();

    const voteData = await knexClient
        .from("upvotes")
        .where({organization_id: organization, crumblink: linkData.id})
        .sum({votes: "votes"})
        .first();

    const ownVote = await knexClient
        .from("upvotes")
        .where({organization_id: organization, crumblink: linkData.id, user: user})
        .sum({votes: "votes"})
        .first();

    return {
        id: linkData.id,
        links: [linkData.from, linkData.to],
        votes: voteData.votes || 0,
        ownVote: ownVote.votes || 0,
        authorId: linkData.creator_id,
        createdAt: linkData.created_at,
    };
};

// Queries

const getLinkedCrumbIds = async (args, organization, user) => {
    logger.info("Getting crumbs linked to id", {id: args.id, organization, user});

    const tos = await knexClient
        .from("crumblinks")
        .where({from: args.id, organization_id: organization})
        .select("to")
        .then((res) => res.map((r) => r.to));
    const froms = await knexClient
        .from("crumblinks")
        .where({to: args.id, organization_id: organization})
        .select("from")
        .then((res) => res.map((r) => r.from));
    return [...new Set(tos.concat(froms))];
};

// Mutations

const createCrumbLink = async (args, organization, user) => {
    logger.info("Creating new crumb link", {to: args.toId, from: args.fromId, organization, user});
    let newIds = await knexClient("crumblinks")
        .insert({
            from: args.fromId,
            to: args.toId,
            creator_id: user,
            organization_id: organization,
        }).returning("id");

    return getCrumbLinkDataById(newIds[0], organization, user);
};

const voteCrumbLink = async (args, organization, user) => {
    logger.info("Voting crumblink", {id: args.id, vote: args.vote, organization, user});

    if (![1, 0, -1].includes(args.vote)) {
        logger.error("Error when voting crumblink as vote is not valid", {
            id: args.id,
            vote: args.vote,
            organization,
            user
        });
        throw new Error("Vote must be +/- 1!");
    }

    await knexClient("upvotes")
        .where({organization_id: organization, user: user, crumblink: args.id})
        .delete();

    if (args.vote !== 0) await knexClient("upvotes")
        .insert({
            crumblink: args.id,
            votes: args.vote,
            user: user,
            organization_id: organization,
        });

    return getCrumbLinkDataById(args.id, organization, user);
};


const getCrumbLinkBetween = async (args, organization, user) => {
    logger.info("Getting crumblink between", {to: args.toId, from: args.fromId, organization, user});
    const ids = await knexClient
        .from("crumblinks")
        .where({organization_id: organization})
        .andWhere("from", "in", [args.fromId, args.toId])
        .andWhere("to", "in", [args.fromId, args.toId])
        .select("id")
        .first();
    return getCrumbLinkDataById(ids.id, organization, user);
};

module.exports = {
    getLinkedCrumbIds,
    getCrumbLinkBetween,
    createCrumbLink,
    voteCrumbLink,
};
