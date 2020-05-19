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
     * @returns user object
     */
    const roleId = await getRoleIdForName(role); // do this at the start to catch errors quickly
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

    managementClient.assignRolestoUser({ id: initialUserData.user_id }, { roles: [roleId] });
    console.log("User got assigned the role", role, "with id", roleId);

    const passwordReset = await authenticationClient.requestChangePasswordEmail({
        email: enrichedUserData.email,
        connection: process.env.AUTH0_CONNECTION_NAME,
    });
    console.log("email reset for user", passwordReset, "is underway");
    return parseUserAttributes(enrichedUserData);
}

async function getRoleIdForName(role) {
    const roleIds = (await managementClient.getRoles()).filter((r) => r.name.toLowerCase() === role.toLowerCase()).map((r) => r.id);
    if (roleIds.length !== 1) throw new ReferenceError("Role " + role + " is not defined");

    console.log("Found roleId", roleIds[0], "for role name", role);
    return roleIds[0];
}

async function parseUserAttributes(userObject) {
    const roles = (await managementClient.getUserRoles({ id: userObject.user_id })).map((role) => role.description);
    return {
        user_id: userObject.user_id,
        name: userObject.name,
        email: userObject.email,
        organization: userObject.app_metadata?.organization,
        organizationRoles: roles,
    };
}

async function getAllUsers() {
    const allUsers = await managementClient.users.getAll();
    return Promise.all(allUsers.map(parseUserAttributes));
}

module.exports = { createUser, getAllUsers };
