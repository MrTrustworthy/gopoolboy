exports.up = function (knex) {
    return knex.schema.alterTable("crumbs", (table) => {
        table.specificType("tags2", "text[]").notNullable().defaultTo('{}');
    });
};

exports.down = function (knex) {

};
