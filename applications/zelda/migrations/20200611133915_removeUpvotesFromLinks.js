exports.up = function (knex) {
    return knex.schema.table("crumblinks", (table) => {
        table.dropColumn("votes");
    });
};

exports.down = function (knex) {
};
