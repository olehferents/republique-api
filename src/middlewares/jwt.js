const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const {JWT_SECRET} = require("../config");

const verifyJWT = async (req, res, next, accessToken) => {
    jwt.verify(accessToken, JWT_SECRET, async (err, userId) => {
        if (err) {
            res.status(403).end();
        }
        req.user = await userService.getUserById(userId);
        next();
    });
}
