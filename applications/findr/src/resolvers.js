const knexClient = require("./knexclient");

const findCrumbs = async (args, organization) => {
    let query = knexClient
        .from("crumbs")
        .where({ organization_id: organization, type: args.type.toLowerCase() })
        .andWhere(function () {
            this.where("text", "ilike", `%${ args.like }%`).orWhere("title", "ilike", `%${ args.like }%`);
        })
        .select("crumbs.id");

    if (args.sortBy === "date") {
        query = query.orderBy("created_at", "desc");
    } else if (args.sortBy === "votes") {
        query = query.orderBy("created_at", "desc");
    } else {
        throw new Error("Can't sort by " + args.sortBy);
    }
    return await query;
};

module.exports = {
    findCrumbs,
};
