const {Kafka} = require("kafkajs");

const topics = {
    VOTES_TOPIC: "crumbler-votes",
    CRUMBS_TOPIC: "crumbler-crumbs",
};

const conf = {
    bootstrap: process.env.KAFKA_BROKER_ENDPOINT,
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
    group: process.env.KAFKA_CONSUMER_GROUP_ID
};

const kafka = new Kafka({
    clientId: "findr-updater-client",
    brokers: [conf.bootstrap],
    ssl: true,
    sasl: {
        mechanism: "PLAIN",
        username: conf.username,
        password: conf.password
    }
});

let __consumer = null;

const getConsumer = async () => {
    if (!__consumer) {
        __consumer = kafka.consumer({groupId: conf.group});
        await __consumer.connect();
    }
    return __consumer;
};


const parseValue = message => JSON.parse(message.value.toString());

const consume = async (topic, handler) => {
    const consumer = await getConsumer();
    await consumer.subscribe({topic, fromBeginning: true});
    console.log("starting consumer");
    await consumer.run({
        eachMessage: async ({message}) => handler(parseValue(message))
    });

};

module.exports = {
    consume,
    topics
};