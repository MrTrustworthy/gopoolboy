const knexClient = require("./knexclient");

const findQuestions = async (args, organization) => {
    return await knexClient
        .from("questions")
        .where({ organization_id: organization })
        .andWhere(function () {
            this.where("text", "ilike", `%${args.like}%`).orWhere("title", "ilike", `%${args.like}%`);
        })
        .select("id as questionId");
};

module.exports = {
    findQuestions,
};
