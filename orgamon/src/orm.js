const knexClient = require('./knexclient');


async function getOrganizations(args, tenant) {
    return knexClient
        .from('organizations')
        .select('id', 'name')
}


module.exports = {getOrganizations};