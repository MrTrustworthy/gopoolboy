exports.up = function (knex) {
    return knex.schema.alterTable("crumbs", (table) => {
        table.renameColumn("tags2", "tags");
    });
};

exports.down = function (knex) {

};
