const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        console.log(authHeader);
        return res.sendStatus(401); //unauthorized
    }

    const token = authHeader.split(" ")[1]; //split the string, then access the string at index 1 (access token)
//verify the access token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //forbidden
        req.email = decoded.userDetails.email,
        req.roles = decoded.userDetails.roles
        next();
    })
}

module.exports = verifyJWT;