exports.up = function (knex) {
    return knex.schema.alterTable("crumbs", (table) => {
        table.dropColumn("tags");
    });
};

exports.down = function (knex) {

};
