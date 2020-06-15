exports.up = function (knex) {
    return knex.schema.table("crumblinks", (table) => {
        table.unique(["from", "to"]);
    });
};

exports.down = function (knex) {

};
