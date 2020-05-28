exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("questions")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("questions").insert([
                {
                    title: "What is love?",
                    text: "something with babies, right?",
                    organization_id: 1,
                    creator_id: "auth0|5eb5c8efdaf2fa0bf89576e2",
                },
                {
                    title: "Who let the dogs out?",
                    text: "Asking for good reasons, miau!",
                    organization_id: 1,
                    creator_id: "auth0|5eb5c8efdaf2fa0bf89576e2",
                },
                {
                    title: "Who can see that?",
                    text: "you shouldn't!",
                    organization_id: 2,
                    creator_id: "auth0|bananas",
                },
            ]);
        });
};
