const jwt = require("jsonwebtoken");
const { User } = require('./../models');
const { JWT_SECRET } = require('./../config');

module.exports = {
    async checkIfExists(email) {
        const user = await User.findOne({
            where: {
                email,
            }
        });
        return !!user;
    },

    async saveUser(user) {
        const created = await User.create(user);
        return created;
    },

    async getUserById(id) {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        return user;
    },

    async getUserByEmail(email) {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        return user;
    },
}
