const {Client} = require('@elastic/elasticsearch');

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

const searchForCrumbs = async (like, organization) => {
    return client.search({
        index: indexPrefix + organization,
        body: {
            query: {
                multi_match: {
                    query: "*" + like + "*",
                    fields: ["title^5", "text", "tags"],
                    fuzziness: "AUTO",
                }
            }
        }
    });
};

module.exports = {
    searchForCrumbs
};