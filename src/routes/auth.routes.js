const express = require('express');
const router = express.Router();
const authController = require('./../controllers').auth;

router.get('/signIn', authController.signIn);

module.exports = router;
