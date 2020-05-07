
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, title: 'What is love?', text: "something with babies, right?"},
        {id: 2, title: 'Who let the dogs out?', text: "Asking for good reasons, miau!"},
      ]);
    });
};
