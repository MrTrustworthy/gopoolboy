exports.up = function (knex) {
    return knex.schema.alterTable("crumbs", (table) => {
        table.text("text").notNullable().alter();
    });
};

exports.down = function (knex) {

};
