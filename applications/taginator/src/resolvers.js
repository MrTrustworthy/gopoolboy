const knexClient = require("./knexclient");
const {produce, topics} = require("./kafka");
const {logger} = require("./log");

// ORM for Tags
const getTagDataById = async (id, organization, user) => {
    logger.info("Retrieving tag by ID", {id, organization, user});

    let tagData = await knexClient
        .from("tags")
        .where({organization_id: organization, id: id})
        .select(["id", "name", "value", "created_at", "creator_id", "organization_id"])
        .first();

    return {
        id: tagData.id,
        name: tagData.name,
        value: tagData.value,
        authorId: tagData.creator_id,
        createdAt: tagData.created_at,
        organizationId: tagData.organization_id
    };
};

// Mutations

const createTag = async (args, organization, user) => {
    logger.info("Creating tag", {taginput: args.tagInput, organization, user});

    let newIds = await knexClient("tags")
        .insert({
            name: args.tagInput.name,
            value: args.tagInput.value,
            organization_id: organization,
            creator_id: user,
        })
        .returning("id");

    const tag = await getTagDataById(newIds[0], organization, user);
    await produce(topics.TAGS_TOPIC, tag);

    return tag;
};

// Queries

const getTagsByIds = async (args, organization, user) => {
    logger.info("Getting all Tags with IDs", {organization, user});
    if (args.ids.length === 0) return [];
    return Promise.all(args.ids.map(id => getTagDataById(id, organization, user)));
};

const getAllTags = async (args, organization, user) => {
    logger.info("Getting all Tags", {organization, user});
    let tags = await knexClient
        .from("tags")
        .where({organization_id: organization})
        .select("id");

    return Promise.all(tags.map(res => getTagDataById(res.id, organization, user)));
};

module.exports = {getTagsByIds, getAllTags, createTag};
