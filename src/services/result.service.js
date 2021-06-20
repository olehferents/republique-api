const { Result } = require('./../models');

module.exports = {
    async saveResult(result) {
        const created = await Result.create(result);

        return created;
    },

    async getUserResult(userId) {
        const results = await Result.findAll({
            where: {
                userId,
            },
        });

        return results;
    },
};
