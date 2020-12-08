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
        const { name, email } = req.body;
        const isUserExists = await userService.checkIfExists(email);
        if (isUserExists) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.status(412).send({
                message: 'User with such email is already exists!',
            });
        } else {
            const user = await userService.saveUser({name, email});
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.status(201).send(user);
        }
    }
}
