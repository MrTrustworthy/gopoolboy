const {searchForCrumbs} = require("./elastic");
const {logger} = require("./log");


const findCrumbs = async (args, organization) => {
    logger.info("Searching for crumb", {like: args.like, organization});
    let result = [];
    try {
        result = await searchForCrumbs(args.like, args.type, args.sortBy, organization);
        result = result.body.hits.hits.map(hit => ({id: hit._source.id}));
    } catch (e) {
        // In some cases (ex. new orga and nothing has been indexed yet so the index doesn't exist)
        // we'll get an error from ES. We want to log this and just show empty results in that case
        logger.error("Error when trying to search for crumbs", {error: e});
        result = [];
    }

    return result;
};

module.exports = {
    findCrumbs,
};
