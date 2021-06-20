const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config');
const { resultService } = require('./../services');

module.exports = {
    async addResult(req, res) {
        if (req.headers && req.headers.authorization) {
            const authorization = req.headers.authorization.split(' ')[1];
            let decoded;
            try {
                decoded = jwt.verify(authorization, JWT_SECRET);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const resultToSave = {
                ...req.body,
                userId: decoded.userId,
            }

            const created = await resultService.saveResult(resultToSave);

            return res.status(201).send(created);
        }
    },

    async getAllByUser(req, res) {
        if (req.headers && req.headers.authorization) {
            const authorization = req.headers.authorization.split(' ')[1];
            let decoded;
            try {
                decoded = jwt.verify(authorization, JWT_SECRET);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const results = await resultService.getUserResult(decoded.userId);

            return res.status(200).send(results);
        }
    },
};
