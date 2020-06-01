const knexClient = require("./knexclient");

const findCrumbs = async (args, organization) => {
    return await knexClient
        .from("crumbs")
        .where({ organization_id: organization, type: args.type.toLowerCase() })
        .andWhere(function () {
            this.where("text", "ilike", `%${args.like}%`).orWhere("title", "ilike", `%${args.like}%`);
        })
        .select("id");
};

module.exports = {
    findCrumbs,
};
