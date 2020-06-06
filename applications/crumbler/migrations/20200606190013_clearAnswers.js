exports.up = function (knex) {
    return knex("crumbs").where("type", "answer").del();
};

exports.down = function (knex) {};
