const knexClient = require("./knexclient");

const findCrumbs = async (args, organization) => {
    let query = knexClient
        .from("crumbs")
        .where({ organization_id: organization, type: args.type.toLowerCase() })
        .andWhere(function () {
            this.where("text", "ilike", `%${args.like}%`).orWhere("title", "ilike", `%${args.like}%`);
        })
        .select("crumbs.id");

    if (args.sortBy === "date") {
        query = query.orderBy("created_at", "desc");
    } else if (args.sortBy === "votes") {
        query = query.orderBy("votes", "desc");
    } else if (args.sortBy === "linked") {
        query = query
            .leftJoin("crumblinks", { "crumbs.id": "crumblinks.from" })
            .groupBy("crumbs.id")
            .sum({ totalLinks: knexClient.raw("CASE WHEN crumblinks.from IS NULL THEN 0 ELSE 1 END") })
            .orderBy("totalLinks", "desc");
    }
    return await query;
};

module.exports = {
    findCrumbs,
};
