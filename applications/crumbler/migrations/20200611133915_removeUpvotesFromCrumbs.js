exports.up = function (knex) {
    return knex.schema.table("crumbs", (table) => {
        table.dropColumn("votes");
    });
};

exports.down = function (knex) {
};
