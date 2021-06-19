const bcrypt = require('bcrypt');
const { User } = require('./../models');

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
        const newUser = { ...user };
        newUser.password = await bcrypt.hash(user.password, 10);
        const created = await User.create(newUser);
        return {
            id: created.id,
            email: created.email,
            password: created.password,
        };
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

    async validatePassword(user) {
        const { email, password } = user;
        const dbUser = await this.getUserByEmail(email);
        return password && !bcrypt.compareSync(password, dbUser.password)
    },
}
