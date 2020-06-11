exports.up = function (knex) {
    return knex.schema.createTable("upvotes", (table) => {
        table.increments("id").primary();
        table.integer("crumb").unsigned().notNullable();
        table.string("user").notNullable();
        table.timestamps(true, true);
        table.string("organization_id").notNullable();
        table.integer("votes").defaultTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("upvotes");
};
