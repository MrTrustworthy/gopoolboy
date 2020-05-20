
function enrichTenantInfo(user, context, callback) {
    if (user.app_metadata && user.app_metadata.organization) {
        context.accessToken['http://dev-poolboy-api'] = {
            'organization': user.app_metadata.organization
        };
    }
    callback(null, user, context);
}