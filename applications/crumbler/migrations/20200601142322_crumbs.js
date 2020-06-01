exports.up = function (knex) {
    return knex.schema.createTable("crumbs", (table) => {
        table.increments("id");
        table.string("type").notNullable();
        table.string("source").notNullable();
        table.string("title").notNullable();
        table.string("text").notNullable();
        table.timestamps(true, true);
        table.integer("votes").defaultTo(0);
        table.string("organization_id").notNullable();
        table.string("creator_id").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("crumbs");
};
