const knexClient = require("./knexclient");
const { v4: uuidv4 } = require("uuid");

const {
    createUser,
    getAllUsers,
    getRoles: apiGetRoles,
    deleteUser: apiDeleteUser,
    assignRoleToUser,
    clearAllRolesFromUser,
    getUserDetails,
    ensureUserIsInOrganization,
} = require("./auth0api");

async function getOrganization(args, organization) {
    return knexClient.from("organizations").select("id", "name").where("id", "=", organization).first();
}

async function getUsers(args, organization) {
    return (await getAllUsers()).filter((user) => user.organization === organization);
}

async function createOrganization(parent, args, context, info) {
    const orgaId = uuidv4();
    console.log("Creating new organization with", args);
    await knexClient.insert({ name: args.name, id: orgaId }).into("organizations");
    console.log("created new org with id", orgaId);
    await createUser(orgaId, args.creatorEmail, "owner");
    return { id: orgaId, name: args.name };
}

async function inviteUser(args, organization) {
    /**
     * Resolver to invite a new user as requested by the organization/org owner
     */
    await createUser(organization, args.email, args.role);
    return getUserDetails(args.id);
}

async function getRoles(args, organization) {
    return (await apiGetRoles()).map((r) => ({ name: r.name, description: r.description }));
}

async function deleteUser(args, organization) {
    await ensureUserIsInOrganization(args.id, organization);
    await apiDeleteUser(args.id);
    return true;
}

async function changeUserRole(args, organization) {
    await ensureUserIsInOrganization(args.id, organization);
    await clearAllRolesFromUser(args.id);
    await assignRoleToUser(args.id, args.role);
    return getUserDetails(args.id);
}

module.exports = { getOrganization, getUsers, createOrganization, inviteUser, getRoles, changeUserRole, deleteUser };
