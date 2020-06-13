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
    console.log("Indexing crumb with id", message.id, "for orga", message.organizationId);
    const indexSuffix = message.organizationId || "missing_orga";
    await client.index({
        index: indexPrefix + indexSuffix,
        id: message.id,
        body: {
            id: message.id,
            title: message.title,
            text: message.text,
            type: message.type,
            votes: message.votes,
            authorId: message.authorId,
            createdAt: message.createdAt,
            tags: message.tags,
            links: [],
        }
    });
};

const voteCrumb = async (message) => {
    console.log("Updating crumb vote with id", message.crumbId, "for orga", message.organizationId);
    const indexSuffix = message.organizationId || "missing_orga";
    await client.update({
        index: indexPrefix + indexSuffix,
        id: message.crumbId,
        body: {
            script: {
                source: "ctx._source.votes += params.amount",
                lang: "painless",
                params: {
                    amount: message.voteChange
                }
            }
        }
    });
};

module.exports = {
    indexCrumb,
    voteCrumb
};