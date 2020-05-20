const knexClient = require("./knexclient");
const { createUser, getAllUsers, getRoles: apiGetRoles } = require("./auth0api");

async function getOrganization(args, organization) {
    return knexClient.from("organizations").select("id", "name").where("id", "=", organization).first();
}

async function getUsers(args, organization) {
    return (await getAllUsers()).filter((user) => user.organization === organization);
}

async function createOrganization(parent, args, context, info) {
    console.log("Creating new organization with", args);
    const queryResponse = await knexClient.insert({ name: args.name }).into("organizations").returning("id");
    const orgaId = queryResponse[0];
    console.log("created new org with id", orgaId);
    await createUser(orgaId, args.creatorEmail, "owner");
    return { id: orgaId, name: args.name };
}

async function inviteUser(args, organization) {
    /**
     * Resolver to invite a new user as requested by the organization/org owner
     */
    return createUser(organization, args.email, args.role);
}

async function getRoles(args, organization) {
    return (await apiGetRoles()).map((r) => ({ name: r.name, description: r.description }));
}

module.exports = { getOrganization, getUsers, createOrganization, inviteUser, getRoles };