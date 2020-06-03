exports.up = function (knex) {
    return knex.schema.table("crumbs", (table) => {
        table.jsonb("tags").defaultTo([]);
    });
};

exports.down = function (knex) {
    return knex.schema.table("crumbs", (table) => {
        table.dropColumn("tags");
    });
};
