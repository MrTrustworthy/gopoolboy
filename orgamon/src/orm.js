const knexClient = require("./knexclient");
const { managementClient, authenticationClient } = require("./auth0api");
const generator = require("generate-password");
const { AuthenticationError } = require("apollo-server");

async function getOrganization(args, tenant) {
    return knexClient.from("organizations").select("id", "name").where("id", "=", tenant).first();
}

async function getUsers(args, tenant) {
    const allUsers = await managementClient.users.getAll();
    return allUsers.map(parseUserAttributes).filter((user) => user.tenant === tenant);
}

async function createOrganization(parent, args, context, info) {
    console.log("Creating new organization with", args);
    const queryResponse = await knexClient.insert({ name: args.name }).into("organizations").returning("id");
    const orgaId = queryResponse[0];
    console.log("created new org with id", orgaId);
    await createUser(orgaId, args.creatorEmail, "owner");
    return { id: orgaId, name: args.name };
}

async function inviteUser(args, tenant, tenantRole) {
    /**
     * Resolver to invite a new user as requested by the tenant/org owner
     */
    if (tenantRole !== "owner") throw new AuthenticationError("Can't create new user for tenant", tenant, "with role", tenantRole);
    return createUser(tenant, args.email, args.role);
}

/** Private functions not being exposed */

async function createUser(orgaId, email, role) {
    /**
     * Creates a new user with those parameters.
     * Assumes all necessary validation has been done previously
     * @returns user object
     */
    const password = generator.generate({ length: 32, numbers: true, symbols: true, strict: true });
    const initialUserData = await managementClient.users.create({
        email: email,
        connection: process.env.AUTH0_CONNECTION_NAME,
        password: password,
    });
    console.log("Created new user with", initialUserData);

    const enrichedUserData = await managementClient.users.update(
        {
            id: initialUserData.user_id,
        },
        {
            app_metadata: {
                tenant: orgaId,
                tenantRole: role,
            },
        }
    );
    console.log("User got assigned app_metadata attributes", enrichedUserData);

    const passwordReset = await authenticationClient.requestChangePasswordEmail({
        email: enrichedUserData.email,
        connection: process.env.AUTH0_CONNECTION_NAME,
    });
    console.log("email reset for user", passwordReset, "is underway");
    return parseUserAttributes(enrichedUserData);
}

function parseUserAttributes(userObject) {
    return {
        user_id: userObject.user_id,
        name: userObject.name,
        email: userObject.email,
        tenant: userObject.app_metadata?.tenant,
        tenantRole: userObject.app_metadata?.tenantRole,
    };
}

module.exports = { getOrganization, getUsers, createOrganization, inviteUser };
