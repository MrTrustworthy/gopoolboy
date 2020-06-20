exports.up = function (knex) {
    return knex.schema.createTable("tags", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("value").notNullable();
        table.timestamps(true, true);
        table.string("organization_id").notNullable();
        table.string("creator_id").notNullable();
    });


};

exports.down = function (knex) {
    return knex.schema.dropTable("tags");
};
