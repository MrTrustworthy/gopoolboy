const {PubSub} = require('@google-cloud/pubsub');

const CONFIGURATION = {
    PUBSUB: null,
    PROJECTID: null,
    TOPICS: {}
};

function getTopic(topicName) {
    if (CONFIGURATION.PUBSUB === null) {
        throw Error("Need to configure pubsub before using it!");
    }
    let topic = CONFIGURATION.TOPICS[topicName];
    if (!topic) {
        topic = CONFIGURATION.PUBSUB.topic(topicName);
        CONFIGURATION.TOPICS[topicName] = topic;
    }
    return topic;
}

function configure(projectId) {
    CONFIGURATION.PROJECTID = projectId;
    CONFIGURATION.PUBSUB = new PubSub({projectId});
}

async function publish(topicName, message) {
    const topic = getTopic(topicName);
    const messageId = await topic.publish(Buffer.from(message));
    console.log(`Published message with id ${messageId}`);
    return messageId;
}

function subscribe(topicName, subscriptionName, callback) {
    const subscription = getTopic(topicName).subscription(subscriptionName);
    const handler = message => {
        console.log(`Received message with ID ${message.id}`);
        callback(message);
    };
    subscription.on("message", handler);
    return handler;
}

function unsubscribe(topicName, subscriptionName, handle) {
    /**
     * The handle to unsubscribe is returned from subscribe()
     */
    const subscription = getTopic(topicName).subscription(subscriptionName);
    console.log(`unsubscribed from ${topicName}.${subscriptionName} via handle ${handle}`);
    return subscription.removeListener("message", handle);
}

function close(){
    return CONFIGURATION.PUBSUB.close()
}

module.exports = {configure, publish, subscribe, unsubscribe, close};