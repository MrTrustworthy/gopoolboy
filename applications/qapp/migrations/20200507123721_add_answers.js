exports.up = function (knex) {
    return knex.schema.createTable("answers", (table) => {
        table.increments("id").primary();
        table.integer("question_id").unsigned().notNullable();
        table.foreign("question_id").references("id").inTable("questions");
        table.string("text").notNullable();
        table.timestamps(true, true);
        table.integer("votes").defaultTo(0);
        table.string("organization_id").notNullable();
        table.string("creator_id").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("answers");
};
