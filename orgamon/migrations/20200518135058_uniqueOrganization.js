
exports.up = function(knex) {
      return knex.schema.alterTable('organizations', table => {
        table.unique('name');
    })
};

exports.down = function(knex) {
  
};
