const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");
const assert = require("assert");
const sayHello = async (args, organization) => {
    return "Hello World again!";
};

module.exports = {
    sayHello,
};
