const { User } = require('./../models');

module.exports = {
    async checkIfExists(email, password) {
        const user = await User.findOne({
            where: {
                email,
                password,
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

    async validatePassword(password) {
        return password && User.validPassword(password);
    },
}
