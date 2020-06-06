exports.up = function (knex) {
    return knex.schema.table("crumblinks", (table) => {
        table.string("organization_id").notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema.table("crumblinks", (table) => {
        table.dropColumn("organization_id");
    });
};
