const {AuthenticationClient, ManagementClient} = require("auth0");
const generator = require("generate-password");
const {logger} = require("./log");


const managementClient = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: "read:users update:users create:users read:roles",
});

const authenticationClient = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
});

/** Private functions not being exposed */

async function createUser(orgaId, email, role) {
    /**
     * Creates a new user with those parameters.
     * Assumes all necessary validation has been done previously
     */
    logger.info("Creating new user", {orgaId, email, role});
    const password = generator.generate({length: 32, numbers: true, symbols: true, strict: true});
    const initialUserData = await managementClient.users.create({
        email: email,
        connection: process.env.AUTH0_CONNECTION_NAME,
        password: password,
    });
    logger.info("Created new user", {orgaId, email, role, user: initialUserData});

    const enrichedUserData = await managementClient.users.update(
        {id: initialUserData.user_id},
        {app_metadata: {organization: orgaId}}
    );
    logger.info("User got assigned app_metadata attributes", {orgaId, email, role, user: enrichedUserData});

    await assignRoleToUser(initialUserData.user_id, role);
    logger.info("User got assigned role", {orgaId, email, role});

    const passwordReset = await authenticationClient.requestChangePasswordEmail({
        email: enrichedUserData.email,
        connection: process.env.AUTH0_CONNECTION_NAME,
    });
    logger.info("Email reset is underway", {orgaId, email, role, reset: passwordReset});

}

async function getRoleIdForName(role) {
    logger.info("Retrieving role ID by name", {role});

    const roleIds = (await getRoles()).filter((r) => r.name.toLowerCase() === role.toLowerCase()).map((r) => r.id);
    if (roleIds.length !== 1) {
        logger.error("Role is not defined", {role});
        throw new ReferenceError(`Role ${role} is not defined`);
    }
    logger.info("Found roleId for role name", {id: roleIds[0], role});
    return roleIds[0];
}

async function assignRoleToUser(userId, role) {
    logger.info("Assigning role to user", {userId, role});
    const roleId = await getRoleIdForName(role);
    await managementClient.assignRolestoUser({id: userId}, {roles: [roleId]});
    logger.info("Assigned role to user", {userId, role, roleId});

}

async function clearAllRolesFromUser(userId) {
    logger.info("Clearing all roles of user", {userId});
    const roleIds = (await getRoles()).map((r) => r.id);
    await managementClient.removeRolesFromUser({id: userId}, {roles: roleIds});
    logger.info("Cleared all roles of user", {userId, roles: roleIds});
}

async function getRoleNameForUser(userId) {
    logger.info("Get Role name for user", {userId});
    const roles = await managementClient.getUserRoles({id: userId});
    if (roles.length !== 1) {
        logger.error("Error when getting role names for user", {userId, roles});
        throw ReferenceError("User " + userId + " should have one role, not " + roles);
    }
    return roles.map((role) => role.name)[0];
}

async function getRoles() {
    return managementClient.getRoles();
}

async function getUserDetails(userId) {
    logger.info("Getting user details", {userId});
    return parseUserAttributes(await managementClient.getUser({id: userId}));
}

async function parseUserAttributes(userObject) {
    return {
        id: userObject.user_id,
        name: userObject.name,
        nickname: userObject.nickname,
        email: userObject.email,
        emailVerified: userObject.email_verified,
        picture: userObject.picture,
        organization: userObject.app_metadata?.organization,
        organizationRole: await getRoleNameForUser(userObject.user_id),
        lastLogin: userObject.last_login,
        createdAt: userObject.created_at,
        loginCount: userObject.logins_count,
    };
}

async function ensureUserIsInOrganization(userId, organization) {
    logger.info("Ensuring user is in organization", {userId, organization});

    let isInOrganization = false;
    try {
        let user = await getUserDetails(userId);
        isInOrganization = user.organization === organization;
    } catch (e) {
        logger.error("Got error when trying to get user", {userId, organization, error: e});
    } finally {
        if (!isInOrganization) {
            logger.error("User doesn't seem to belong in organization", {userId, organization});
            throw new AuthenticationError("User " + userId + " does not belong to organization " + organization);
        }
    }
}

async function deleteUser(userId) {
    logger.info("Deleting user", {userId});
    return managementClient.deleteUser({id: userId});
}

async function getAllUsers() {
    logger.info("Getting all users");

    const allUsers = await managementClient.users.getAll();
    return Promise.all(allUsers.map(parseUserAttributes));
}

module.exports = {
    createUser,
    getAllUsers,
    getRoles,
    assignRoleToUser,
    clearAllRolesFromUser,
    getUserDetails,
    ensureUserIsInOrganization,
    deleteUser,
};
