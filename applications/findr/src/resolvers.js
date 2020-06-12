const {searchForCrumbs} = require("./elastic");

const findCrumbs = async (args, organization) => {
    const result = await searchForCrumbs(args.like, args.type, args.sortBy, organization);
    return result.body.hits.hits.map(hit => ({id: hit._source.id}));
};

module.exports = {
    findCrumbs,
};
