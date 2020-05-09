require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

async function isTokenValid(token) {
    if (!token) return {error: "No token provided"};

    const bearerToken = token.split(" ");

    return new Promise((resolve, reject) => {
        jwt.verify(
            bearerToken[1],
            getKey,
            {
                audience: process.env.API_IDENTIFIER,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ["RS256"]
            },
            (error, decoded) => {
                if (error) {
                    console.log(bearerToken[1], "ERROR IS ", error)
                    resolve({error});
                }
                if (decoded) {
                    resolve({decoded});
                }
            }
        );
    });


}

module.exports = isTokenValid;