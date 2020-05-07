
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert([
        {id: 1, question_id: 1, text: 'Baba yaga don\'t hurt me?', votes: 3},
        {id: 2, question_id: 1, text: 'Baby don\'t cry', votes: 8},
        {id: 3, question_id: 2, text: 'The who let them out!', votes: 0},
      ]);
    });
};
