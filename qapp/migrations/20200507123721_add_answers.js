exports.up = function (knex) {
    return knex.schema.createTable('answers', table => {
        table.increments('id').primary();
        table.integer('question_id').unsigned().notNullable();
        table.foreign('question_id').references('id').inTable("questions");
        table.string('text').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('votes').defaultTo(0);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('answers');
};