const knexClient = require("./knexclient");
const {v4: uuidv4} = require("uuid");
const {logger} = require("./log");


const {
    createUser,
    getAllUsers,
    getRoles: apiGetRoles,
    deleteUser: apiDeleteUser,
    getRoleNameForUser,
    assignRoleToUser,
    clearAllRolesFromUser,
    getUserDetails,
    ensureUserIsInOrganization,
} = require("./auth0api");

/* Organization resolvers */

async function createOrganization(parent, args, context, info) {
    /**
     * Un-authenticated resolver to create a completely new organization plus the first (admin) user
     */
    const orgaId = uuidv4();
    logger.info("Creating new organization", {orgaId, name: args.name, creatorEmail: args.creatorEmail});
    await knexClient.insert({name: args.name, id: orgaId}).into("organizations");
    await createUser(orgaId, args.creatorEmail, "owner");
    return {id: orgaId, name: args.name};
}

async function getOrganization(args, organization) {
    logger.info("Get Organization", {organization});
    return knexClient
        .from("organizations")
        .select("id", "name", "created_at as createdAt")
        .where("id", "=", organization)
        .first();
}

/* User Resolvers */

async function getUsers(args, organization) {
    logger.info("Get Users for organization", {organization});
    return (await getAllUsers()).filter((user) => user.organization === organization);
}

async function getUser(args, organization) {
    logger.info("Get User", {id: args.id, organization});
    await ensureUserIsInOrganization(args.id, organization);
    return getUserDetails(args.id);
}

async function inviteUser(args, organization) {
    /**
     * Resolver to invite a new user as requested by the organization/org owner
     */
    logger.info("Inviting new user", {email: args.email, role: args.role, organization});
    await createUser(organization, args.email, args.role);
    return getUserDetails(args.id);
}

async function deleteUser(args, organization) {
    logger.info("Delete user", {id: args.id, organization});
    const msg = `deleting user ${args.id} in organization ${organization}`;
    try {
        await ensureUserIsInOrganization(args.id, organization);
        await apiDeleteUser(args.id);
        return {success: true, message: `${msg} was successful`};
    } catch (e) {
        return {success: false, message: `${msg} was not successful`};
    }
}

/* Role Resolvers */

async function getRoles(args, organization) {
    logger.info("Getting Roles", {organization});
    return (await apiGetRoles()).map((r) => ({name: r.name, description: r.description}));
}

async function changeUserRole(args, organization, user) {
    logger.info("Changing user role", {id: args.id, role: args.role, organization});
    await ensureUserIsInOrganization(args.id, organization);

    // Ensure users can't change their own roles
    // This also guards against "removed the last owner" cases
    if (args.id === user) {
        logger.warn("Users can't modify their own role", {organization, user, role: args.role});
        throw Error("Users can't modify their own role");
    }

    await clearAllRolesFromUser(args.id);
    await assignRoleToUser(args.id, args.role);
    return getUserDetails(args.id);
}

module.exports = {
    getOrganization,
    getUsers,
    getUser,
    createOrganization,
    inviteUser,
    getRoles,
    changeUserRole,
    deleteUser,
};
