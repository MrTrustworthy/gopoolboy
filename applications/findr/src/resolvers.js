const {searchForCrumbs} = require("./elastic");

const findCrumbs = async (args, organization) => {
    const result = await searchForCrumbs(args.like, organization);
    console.log("Search results are", result.body);
    return result.body.hits.hits.map(hit => ({id: hit._source.id}));
};

module.exports = {
    findCrumbs,
};
