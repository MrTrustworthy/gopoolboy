exports.up = function (knex) {
    return knex.schema.createTable("crumblinks", (table) => {
        table.increments("id").primary();
        table.integer("from").unsigned().notNullable();
        table.foreign("from").references("id").inTable("crumbs");
        table.integer("to").unsigned().notNullable();
        table.foreign("to").references("id").inTable("crumbs");
        table.timestamps(true, true);
        table.integer("votes").defaultTo(0);
        table.string("creator_id").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("crumblinks");
};
