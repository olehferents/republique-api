const { userService } = require('./../services');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config');

module.exports = {
    async signIn(req, res) {
        const { email } = req.body;
        const isUserExists = await userService.checkIfExists(email);
        if(isUserExists) {
            const user = await userService.getUserByEmail(email);
            const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET);
            const isPasswordValid = await userService.validatePassword(req.body);
            if (!isPasswordValid) {
                return res.status(412).send({
                    message: 'Wrong password!',
                });
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.send({
                accessToken,
            });
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.status(404).send({
                message: 'User with such email is not exists!',
            });
        }
    },

    async signUp(req, res) {
        const { email } = req.body;
        const isUserExists = await userService.checkIfExists(email);
        if (isUserExists) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.status(412).send({
                message: 'User with such email or password is already exists!',
            });
        } else {
            const user = await userService.saveUser(req.body);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.status(201).send(user);
        }
    }
}
