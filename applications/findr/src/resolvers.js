const {searchForCrumbs} = require("./elastic");
const {logger} = require("./log");


const findCrumbs = async (args, organization) => {
    logger.info("Searching for crumb", {like: args.like, organization});
    try {
        const result = await searchForCrumbs(args.like, args.type, args.sortBy, organization);
    } catch (e) {
        logger.error("Error when trying to search for crumbs", {error: e});
        return [];
    }

    return result.body.hits.hits.map(hit => ({id: hit._source.id}));
};

module.exports = {
    findCrumbs,
};
