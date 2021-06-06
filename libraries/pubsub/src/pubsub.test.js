/**
 * @jest-environment node
 */
const {configure, publish, subscribe, close} = require('./pubsub');
const {waitFor} = require("./waitfor");

test('Message sent can be received', async () => {


    const testMessage = "This is a test message!";
    const projectId = 'staging-poolboy';
    const topicName = 'dev-crumbler-updates';
    const subscriptionName = 'testsubscription';

    configure(projectId);

    let consumedMessage = null;
    let messageHandler = message => {
        message.ack();
        if (consumedMessage !== null) {
            throw Error(`Already have a message ${consumedMessage.id}, can't add ${message.id}`);
        }
        consumedMessage = message;
    };

    subscribe(topicName, subscriptionName, messageHandler);
    let publishedMessageId = await publish(topicName, testMessage);
    await waitFor(() => consumedMessage !== null);

    expect(consumedMessage.id).toBe(publishedMessageId);
    await close();
});

