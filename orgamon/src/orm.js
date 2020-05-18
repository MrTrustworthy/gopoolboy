const knexClient = require('./knexclient');
const {managementClient, authenticationClient} = require('./auth0api');
const generator = require('generate-password');

async function getOrganization(args, tenant) {
    return knexClient
        .from('organizations')
        .select('id', 'name')
        .where('id', '=', tenant)
        .first()
}

async function getUsers(args, tenant) {
    const parseUserAttributes = (userObject) => {
        return {
            user_id: userObject.user_id,
            name: userObject.name,
            email: userObject.email,
            tenant: userObject?.app_metadata?.tenant,
            tenantRole: userObject?.app_metadata?.tenantRole
        }
    };
    const allUsers = await managementClient.users.getAll();
    return allUsers
        .map(parseUserAttributes)
        .filter(user => user.tenant === tenant);
}


async function createOrganization(parent, args, context, info) {
    console.log("Creating new organization with", args);

    const queryResponse = await knexClient
        .insert({'name': args.name})
        .into(('organizations'))
        .returning('id');
    const orgaId = queryResponse[0];
    console.log("created new org with id", orgaId);

    const password = generator.generate({length: 32, numbers: true, symbols: true, strict: true});
    const userData = await managementClient.users.create({
        "email": args.creatorEmail,
        "connection": process.env.AUTH0_CONNECTION_NAME,
        "password": password
    });
    console.log("Created new user with", userData);

    const metadataChange = await managementClient.users.update({
        id: userData.user_id
    }, {
        app_metadata: {
            tenant: orgaId,
            tenantRole: "owner"
        }
    });
    console.log("User got assigned app_metadata attributes", metadataChange);


    const passwordReset = await authenticationClient.requestChangePasswordEmail({
        "email": userData.email,
        "connection": process.env.AUTH0_CONNECTION_NAME,
    });
    console.log("email reset for user", passwordReset);


    return {"id": orgaId, "name": args.creatorEmail}
}

module.exports = {getOrganization, getUsers, createOrganization};
