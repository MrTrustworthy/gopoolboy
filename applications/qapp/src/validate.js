const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const { AuthenticationError } = require("apollo-server");

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

async function isTokenValid(token) {
    if (!token) return { error: "No token provided" };

    const bearerToken = token.split(" ");

    return new Promise((resolve, reject) => {
        jwt.verify(
            bearerToken[1],
            getKey,
            {
                audience: process.env.API_IDENTIFIER,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ["RS256"],
            },
            (error, decoded) => {
                if (error) {
                    resolve({ error });
                }
                if (decoded) {
                    resolve({ decoded });
                }
            }
        );
    });
}

function authRequired(resolverFunction, requiredPermission = null) {
    return async (parent, args, context, info) => {
        let { error, decoded } = await isTokenValid(context["authToken"]);
        if (error) throw new AuthenticationError(error);
        if (requiredPermission !== null && !decoded.permissions.includes(requiredPermission)) {
            let msg = "User " + decoded.sub + " doesn't have the required permission " + requiredPermission;
            throw new AuthenticationError(msg);
        }
        let { organization } = decoded[process.env.API_IDENTIFIER];
        return resolverFunction(args, organization);
    };
}

module.exports = authRequired;
