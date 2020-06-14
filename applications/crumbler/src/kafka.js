const {Kafka} = require("kafkajs");
const {logger} = require("./log");

const topics = {
    VOTES_TOPIC: "crumbler-votes",
    CRUMBS_TOPIC: "crumbler-crumbs",
};

const keyFields = {
    [topics.VOTES_TOPIC]: ["crumb", "user"],
    [topics.CRUMBS_TOPIC]: ["id"]
};

const conf = {
    bootstrap: process.env.KAFKA_BROKER_ENDPOINT,
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
};

const kafka = new Kafka({
    clientId: "crumbler-client",
    brokers: [conf.bootstrap],
    ssl: true,
    sasl: {
        mechanism: "PLAIN",
        username: conf.username,
        password: conf.password
    }
});

let __producer = null;

const getProducer = async () => {
    if (!__producer) {
        __producer = kafka.producer();
        await __producer.connect();
    }
    return __producer;
};

const produce = async (topic, message) => {
    const producer = await getProducer();

    // Create a key based on the payload
    const keyObject = {};
    keyFields[topic].forEach(fld => keyObject[fld] = message[fld]);

    logger.info("Producing kafka message", {key: keyObject});
    return producer.send({
        topic: topic,
        messages: [{
            key: JSON.stringify(keyObject),
            value: JSON.stringify(message)
        }]
    });
};

module.exports = {
    produce,
    topics
};