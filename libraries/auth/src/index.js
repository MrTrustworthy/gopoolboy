const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");


// Config and initialization
const config = {};
const initialize = (domain, apiIdentifier, errorType) => {
    config.client = jwksClient({jwksUri: `https://${domain}/.well-known/jwks.json`});
    config.domain = domain;
    config.apiIdentifier = apiIdentifier;
    config.errorType = errorType;
};
const ensureInitialized = () => {
    if (!config.client || !config.domain || !config.apiIdentifier || !config.errorType)
        throw new ReferenceError("Please initialize the auth module before using it!");
};


const getKey = (header, callback) => {
    config.client.getSigningKey(header.kid, function (error, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

// Permissions
const PERMISSIONS = {
    CREATE_CRUMBS: "create:crumbs",
    READ_CRUMBS: "read:crumbs",
    CREATE_CRUMBLINKS: "create:crumblinks",
    READ_CRUMBLINKS: "read:crumblinks",
    CREATE_TAGS: "create:tags",
    READ_TAGS: "read:tags",
    CREATE_USERS: "create:users",
    READ_USERS: "read:users",
    MODIFY_USERS: "modify:users",
    DELETE_USERS: "delete:users",
    READ_ORGANIZATION: "read:organization"
};


// Validation
const isTokenValid = async (token) => {
    if (!token) return {error: "No token provided"};

    const bearerToken = token.split(" ");

    return new Promise((resolve, reject) => {
        jwt.verify(
            bearerToken[1],
            getKey,
            {
                audience: config.apiIdentifier,
                issuer: `https://${config.domain}/`,
                algorithms: ["RS256"],
            },
            (error, decoded) => {
                if (error) {
                    resolve({error});
                }
                if (decoded) {
                    resolve({decoded});
                }
            }
        );
    });
};

function authRequired(resolverFunction, requiredPermission = null) {
    ensureInitialized();
    return async (parent, args, context, info) => {
        let {error, decoded} = await isTokenValid(context["authToken"]);
        if (error) throw new config.errorType(error);
        if (requiredPermission !== null && !decoded.permissions.includes(requiredPermission)) {
            let msg = `User ${decoded.sub} doesn't have the "${requiredPermission}" permission required for this`;
            throw new config.errorType(msg);
        }
        let {organization} = decoded[config.apiIdentifier];
        return resolverFunction(args, organization, decoded.sub, info);
    };
}

module.exports = {authRequired, initialize, PERMISSIONS};
