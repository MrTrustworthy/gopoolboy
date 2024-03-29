const {Kafka} = require("kafkajs");
const {logger} = require("./log");


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
        logger.info("Creating new kafka consumer", {groupId: conf.group})

    if (!__consumer) {
        __consumer = kafka.consumer({groupId: conf.group});
        await __consumer.connect();
    }
    return __consumer;
};


const parseValue = message => JSON.parse(message.value.toString());

const consume = async (pipes) => {
    const consumer = await getConsumer();
    const topicsRegex = new RegExp(`${Object.keys(pipes).join("|")}`);

    logger.info("Subscribing consumer", {topics: topicsRegex});
    await consumer.subscribe({
        topic: topicsRegex,
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async ({topic, message}) => {
            logger.info("Received message", {topic, offset: message.offset})
            let parsedMessage = parseValue(message);
            let handler = pipes[topic];
            handler(parsedMessage);
        }
    });

};

module.exports = {
    consume,
    topics
};