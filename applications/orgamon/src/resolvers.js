const knexClient = require("./knexclient");
const {v4: uuidv4} = require("uuid");
const {logger} = require("./log");


const {
    createUser,
    getAllOrganizationUsers,
    getRoles: apiGetRoles,
    deleteUser: apiDeleteUser,
    assignRoleToUser,
    clearAllRolesFromUser,
    getOrganizationUser,
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

async function _getRoleDistribution(args, organization) {
    const roles = await getRoles(args, organization);
    const roleCounts = roles.reduce((acc, curr) => {
        acc[curr.name] = 0;
        return acc;
    }, {});
    (await getUsers(args, organization)).forEach(u => roleCounts[u.organizationRole]++);
    return roleCounts;
}

/* User Resolvers */

async function getUsers(args, organization) {
    logger.info("Get Users for organization", {organization});
    return getAllOrganizationUsers(organization);
}

async function getUser(args, organization) {
    logger.info("Get User", {id: args.id, organization});
    return getOrganizationUser(args.id, organization);
}

async function inviteUser(args, organization) {
    /**
     * Resolver to invite a new user as requested by the organization/org owner
     */
    logger.info("Inviting new user", {email: args.email, role: args.role, organization});
    await createUser(organization, args.email, args.role);
    return getOrganizationUser(args.id, organization);
}

async function deleteUser(args, organization) {
    logger.info("Delete user", {id: args.id, organization});
    const user = await getOrganizationUser(args.id, organization);

    if (user.organizationRole.toLowerCase() === "owner") {
        return {success: false, message: "Can't delete the owner of an organization"};
    }
    const totalOrganizationUsers = (await getUsers(args, organization)).length;
    if (totalOrganizationUsers <= 1) {
        return {success: false, message: "Can't delete the last user of an organization"};
    }

    const msg = `Deleting user ${args.id} in organization ${organization}`;
    try {
        await apiDeleteUser(args.id);
        return {success: true, message: `${msg} was successful`};
    } catch (e) {
        return {success: false, message: `${msg} was not successful due to an error`};
    }
}

/* Role Resolvers */

async function getRoles(args, organization) {
    logger.info("Getting Roles", {organization});
    return (await apiGetRoles()).map((r) => ({name: r.name, description: r.description}));
}

async function changeUserRole(args, organization, user) {
    logger.info("Changing user role", {id: args.id, role: args.role, organization});
    await getOrganizationUser(args.id, organization);  // will throw an error if there's none

    // Ensure users can't change their own roles
    // This also guards against "removed the last owner" cases
    if (args.id === user) {
        logger.warn("Users can't modify their own role", {organization, user, role: args.role});
        throw Error("Users can't modify their own role");
    }

    await clearAllRolesFromUser(args.id);
    await assignRoleToUser(args.id, args.role);
    return getOrganizationUser(args.id, organization);
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
