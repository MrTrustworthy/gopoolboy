exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("answers")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("answers").insert([
                {
                    id: 1,
                    question_id: 1,
                    text: "Baba yaga don't hurt me?",
                    votes: 3,
                    organization_id: 1,
                    creator_id: "auth0|5eb5c8efdaf2fa0bf89576e2",
                },
                {
                    id: 2,
                    question_id: 1,
                    text: "Baby don't cry no more",
                    votes: 8,
                    organization_id: 1,
                    creator_id: "auth0|5eb5c8efdaf2fa0bf89576e2",
                },
                {
                    id: 3,
                    question_id: 2,
                    text: "The who let them out!",
                    votes: 0,
                    organization_id: 1,
                    creator_id: "auth0|5eb5c8efdaf2fa0bf89576e2",
                },
                {
                    id: 4,
                    question_id: 3,
                    text: "Go hide!",
                    votes: 23,
                    organization_id: 2,
                    creator_id: "auth0|bananas",
                },
            ]);
        });
};
