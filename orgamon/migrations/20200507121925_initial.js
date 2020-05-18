exports.up = function (knex) {
    return knex.schema.createTable('organizations', table => {
        table.increments('id');
        table.string('name').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('organizations');
};
