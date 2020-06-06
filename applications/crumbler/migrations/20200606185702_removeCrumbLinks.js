exports.up = function (knex) {
    return knex.schema.dropTable("crumblinks");
};

exports.down = function (knex) {};
