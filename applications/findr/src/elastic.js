const assert = require('assert');
const {Client} = require('@elastic/elasticsearch');
const {logger} = require("./log");

const indexPrefix = process.env.ES_INDEX_PREFIX;
const client = new Client({
    cloud: {
        id: process.env.ES_CLOUD_ID
    },
    auth: {
        username: process.env.ES_AUTH_USER,
        password: process.env.ES_AUTH_PW
    }
});

const searchForCrumbs = async (like, type, sortBy, organization) => {
    logger.info("Querying ES for crumb", {like, type, organization, sortBy});

    assert(["relevance", "votes", "createdAt"].includes(sortBy), `SortBy must not be ${sortBy}`);
    assert(["question", "answer", "all"].includes(type), `Type must not be ${type}`);

    if (sortBy === "relevance") sortBy = "_score";

    let query = {
        bool: {
            should: [
                {
                    wildcard: {
                        title: {
                            value: "*" + like + "*",
                            boost: 5,
                            rewrite: "scoring_boolean"
                        },
                    }
                },
                {
                    wildcard: {
                        text: {
                            value: "*" + like + "*",
                            rewrite: "scoring_boolean"
                        },
                    }
                },
            ],
            minimum_should_match: 1
        }
    };

    // Add a MUST filter for the type if there's a specific type to search for
    if (type !== "all") query.bool["must"] = [
        {match: {type: type}}
    ];

    return client.search({
        index: indexPrefix + organization,
        body: {
            from: 0,
            size: 10,
            query: query,
            sort: {[sortBy]: {order: "desc"}}
        }
    });
};

module.exports = {
    searchForCrumbs
};