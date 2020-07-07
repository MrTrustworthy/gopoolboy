const knexClient = require("./knexclient");
const {produce, topics} = require("./kafka");
const {logger} = require("./log");

// ORM for Crumb
const getCrumbDataById = async (id, organization, user) => {
    logger.info("Retrieving crumb by ID", {id, organization, user});

    let crumbData = await knexClient
        .from("crumbs")
        .where({organization_id: organization, id: id})
        .select(["id", "title", "text", "type", "source", "created_at", "creator_id", "tags", "organization_id"])
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
        tags: crumbData.tags,
        organizationId: crumbData.organization_id
    };
};

// Mutations

const createCrumb = async (args, organization, user) => {
    let type = args.type.toLowerCase();
    logger.info("Creating crumb", {type, organization, user});

    let newIds = await knexClient("crumbs")
        .insert({
            title: args.title,
            text: args.text,
            type: type,
            source: "web",
            organization_id: organization,
            creator_id: user,
            tags: args.tags,
        })
        .returning("id");

    const crumb = await getCrumbDataById(newIds[0], organization, user);
    await produce(topics.CRUMBS_TOPIC, crumb);

    return crumb;
};

const voteCrumb = async (args, organization, user) => {
    if (![1, 0, -1].includes(args.vote)) {
        logger.error("Invalid vote to vote crumb", {id: args.id, vote: args.vote, organization, user});
        throw new Error("Vote must be +/- 1!");
    }


    const oldVoteRecord = await knexClient("upvotes")
        .where({organization_id: organization, user: user, crumb: args.id})
        .select("votes")
        .first();
    const oldVote = oldVoteRecord?.votes || 0;
    const voteChange = args.vote - oldVote;

    logger.info("Voting crumb", {id: args.id, newVote: args.vote, oldVote, organization, user});

    // Clear any existing votes
    await knexClient("upvotes")
        .where({organization_id: organization, user: user, crumb: args.id})
        .delete();


    // only +/-1 votes are created, which means a 0-vote simply acts as delete
    if (args.vote !== 0) await knexClient("upvotes").insert({
        crumb: args.id,
        votes: args.vote,
        user: user,
        organization_id: organization,
    });

    await produce(topics.VOTES_TOPIC, {
        crumbId: args.id,
        voteChange: voteChange,
        user: user,
        organizationId: organization,
    });

    return getCrumbDataById(args.id, organization, user);
};

// Queries

const getCrumb = async (args, organization, user) => {
    return getCrumbDataById(args.id, organization, user);
};

const _fetchMinimalDataForCrumb = async (crumbData, organization, user, queryInfo) => {
    /**
     * Will fetch the full crumb data if needed, or just the IDs if only those are queries
     */
    if (crumbData.length === 0) return [];

    const fields = queryInfo.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
    if (fields.length === 1 && fields[0] === "id") return crumbData;
    return Promise.all(crumbData.map(record => getCrumbDataById(record.id, organization, user)));
};

const getCrumbsWithTag = async (args, organization, user, info) => {
    logger.info("Getting all crumbs with tag", {tags: args.tags});
    const crumbData = await knexClient
        .from("crumbs")
        .where({organization_id: organization})
        .andWhere("tags", "@>", [args.tag])
        .select("id");
    return _fetchMinimalDataForCrumb(crumbData, organization, user, info);
};

const getCrumbsByAuthor = async (args, organization, user, info) => {
    logger.info("Getting all crumbs by author", {authorId: args.authorId});
    const crumbData = await knexClient
        .from("crumbs")
        .where({organization_id: organization, creator_id: args.authorId})
        .select("id");
    return _fetchMinimalDataForCrumb(crumbData, organization, user, info);
};

module.exports = {
    getCrumb,
    getCrumbsWithTag,
    getCrumbsByAuthor,
    createCrumb,
    voteCrumb,
};
