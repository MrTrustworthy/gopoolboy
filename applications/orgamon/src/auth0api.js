const { AuthenticationClient, ManagementClient } = require("auth0");
const generator = require("generate-password");

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
    const password = generator.generate({ length: 32, numbers: true, symbols: true, strict: true });
    const initialUserData = await managementClient.users.create({
        email: email,
        connection: process.env.AUTH0_CONNECTION_NAME,
        password: password,
    });
    console.log("Created new user with", initialUserData);

    const enrichedUserData = await managementClient.users.update(
        { id: initialUserData.user_id },
        { app_metadata: { organization: orgaId } }
    );
    console.log("User got assigned app_metadata attributes", enrichedUserData);

    await assignRoletoUser(initialUserData.user_id, role);

    const passwordReset = await authenticationClient.requestChangePasswordEmail({
        email: enrichedUserData.email,
        connection: process.env.AUTH0_CONNECTION_NAME,
    });
    console.log("email reset for user", passwordReset, "is underway");
}

async function getRoleIdForName(role) {
    const roleIds = (await getRoles()).filter((r) => r.name.toLowerCase() === role.toLowerCase()).map((r) => r.id);
    if (roleIds.length !== 1) throw new ReferenceError("Role " + role + " is not defined");
    console.log("Found roleId", roleIds[0], "for role name", role);
    return roleIds[0];
}

async function assignRoleToUser(userId, role) {
    const roleId = await getRoleIdForName(role);
    console.log("User gets assigned the role", role, "with id", roleId);
    managementClient.assignRolestoUser({ id: userId }, { roles: [roleId] });
}

async function clearAllRolesFromUser(userId) {
    console.log("Clearing all roles for user", userId);
    const roleIds = (await getRoles()).map((r) => r.id);
    managementClient.removeRolesFromUser({ id: userId }, { roles: roleIds });
}

async function getRoleNameForUser(userId) {
    const roles = await managementClient.getUserRoles({ id: userId });
    if (roles.length !== 1) throw ReferenceError("User " + userId + " should have one role, noe " + roles);
    return roles.map((role) => role.name)[0];
}

async function getRoles() {
    return managementClient.getRoles();
}

async function getUserDetails(userId) {
    return parseUserAttributes(await managementClient.getUser({ id: userId }));
}

async function parseUserAttributes(userObject) {
    return {
        id: userObject.user_id,
        name: userObject.name,
        email: userObject.email,
        organization: userObject.app_metadata?.organization,
        organizationRole: await getRoleNameForUser(userObject.user_id),
    };
}

async function ensureUserIsInOrganization(userId, organization) {
    let isInOrganization = false;
    try {
        let user = await getUserDetails(userId);
        isInOrganization = user.organization === organization;
    } catch (e) {
        console.log("Got an error when trying to get user " + userId + ", does it exist?");
    } finally {
        if (!isInOrganization) {
            throw new AuthenticationError("User " + userId + " does not belong to organization " + organization);
        }
    }
}

async function deleteUser(userId) {
    console.log("Deleting user with id", userId);
    return managementClient.deleteUser({ id: userId });
}

async function getAllUsers() {
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
