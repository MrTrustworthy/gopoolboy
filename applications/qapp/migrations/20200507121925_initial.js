exports.up = function (knex) {
    return knex.schema.createTable("questions", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.string("text").notNullable();
        table.timestamps(true, true);
        table.integer("votes").defaultTo(0);
        table.string("organization_id").notNullable();
        table.string("creator_id").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("questions");
};
