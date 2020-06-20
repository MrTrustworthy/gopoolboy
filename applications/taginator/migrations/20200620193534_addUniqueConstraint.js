exports.up = function (knex) {
    return knex.schema.table("tags", (table) => {
        table.unique(["name", "value", "organization_id"]);
    });
};

exports.down = function (knex) {

};