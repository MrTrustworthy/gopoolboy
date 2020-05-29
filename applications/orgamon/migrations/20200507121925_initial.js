exports.up = function (knex) {
    return knex.schema.createTable("organizations", (table) => {
        table.string("id").primary();
        table.string("name").unique().notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("organizations");
};
