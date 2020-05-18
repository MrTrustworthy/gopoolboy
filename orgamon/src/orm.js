const knexClient = require('./knexclient');
const {managementClient} = require('./auth0api');

async function getOrganization(args, tenant) {
    return knexClient
        .from('organizations')
        .select('id', 'name')
        .where('id', '=', tenant)
        .first()
}

async function getUsers(args, tenant) {
    const allUsers = await managementClient.users.getAll();
    return allUsers
        .map(parseUserAttributes)
        .filter(user => user.tenant === tenant);
}


function parseUserAttributes(userObject) {
    return {
        user_id: userObject.user_id,
        name: userObject.name,
        email: userObject.email,
        tenant: userObject?.app_metadata?.tenant,
        tenantRole: userObject?.app_metadata?.tenantRole
    }
}

module.exports = {getOrganization, getUsers};