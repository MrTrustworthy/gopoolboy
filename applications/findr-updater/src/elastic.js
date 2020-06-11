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

const indexCrumb = async (message) => {
    console.log("Indexing message with id", message.id, "for orga", message.organizationId);
    const indexSuffix = message.organizationId || "missing_orga";
    await client.index({
        index: indexPrefix + indexSuffix,
        id: message.id,
        body: {
            ...message,
            links: [],
        }
    });
};

module.exports = {
    indexCrumb
};