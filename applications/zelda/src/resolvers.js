const knexClient = require("./knexclient");
const { AuthenticationError } = require("apollo-server");
const assert = require("assert");

// Utilities

const ensureCrumbLinkInOrga = async (objectId, organization, user) => {
    let result = await knexClient("crumblinks").select("organization_id").where({ id: objectId }).first();
    let orgaId = result.organization_id;
    if (orgaId !== organization) {
        console.log("Error when trying to access crumb with orgaId", orgaId, "as user from", organization);
        throw new AuthenticationError("Can't operate with this object as it's organization ID doesn't match");
    }
};

const getLinkedCrumbIds = async (args, organization, user) => {
    return knexClient
        .from("crumblinks")
        .where({ from: args.from, organization_id: organization })
        .select({ to })
        .then((res) => res.map((r) => r.to));
};

// Mutations

const createCrumbLink = async (args, organization, user) => {};

const upvoteCrumbLink = async (args, organization, user) => {};

module.exports = {
    getLinkedCrumbIds,
    createCrumbLink,
    upvoteCrumbLink,
};
