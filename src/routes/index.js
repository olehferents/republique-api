const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const resultRouter = require('./result.routes');

router.use('/auth', authRouter);
router.use('/result', resultRouter);

module.exports = router;
