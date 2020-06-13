const knexClient = require("./knexclient");
const {produce, topics} = require("./kafka");

// ORM for Crumb
const getCrumbDataById = async (id, organization, user) => {
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

    const crumb = await getCrumbDataById(newIds[0], organization, user);
    await produce(topics.CRUMBS_TOPIC, crumb);

    return crumb;
};

const voteCrumb = async (args, organization, user) => {
    if (![1, 0, -1].includes(args.vote)) throw new Error("Vote must be +/- 1!");

    const oldVoteRecord = await knexClient("upvotes")
        .where({organization_id: organization, user: user, crumb: args.id})
        .select("votes")
        .first();
    const oldVote = oldVoteRecord?.votes || 0;
    const voteChange = args.vote - oldVote;

    console.log(`Turning vote from user ${user} in org ${organization} from ${oldVote} into ${args.vote}`);

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

module.exports = {
    getCrumb,
    createCrumb,
    voteCrumb,
};
