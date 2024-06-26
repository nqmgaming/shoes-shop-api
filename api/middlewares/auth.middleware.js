const jwt = require('jsonwebtoken');
require('dotenv').config();

// check if token is valid
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Verify token error");
            return res.sendStatus(403);
        }
        console.log("Verify token");
        req.user = user;
        next();
    })
}

// create token
function createToken(user) {
    const payload = {
        sub: user._id,
        iat: Math.floor(Date.now() / 1000),
        iss: process.env.SERVER_URL
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

}

module.exports = {
    authenticateToken,
    createToken
}
