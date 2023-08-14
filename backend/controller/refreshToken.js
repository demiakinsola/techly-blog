const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //check if the request contains cookies
    if (!cookies?.jwt) {
        console.log(cookies);
        return res.sendStatus(401); //unauthorised
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //forbidden
    
    //if user is found, verify the refresh token
jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403); //forbidden
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
        {
            userDetails: {
                email: decoded.email,
                roles: roles
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
    );
    res.json({ accessToken });
});
};

module.exports = { handleRefreshToken };