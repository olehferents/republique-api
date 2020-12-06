const express = require('express');
const router = express.Router();
const { authController } = require('./../controllers');

router.post('/signIn', authController.signIn);
router.post('/signUp', authController.signUp);

module.exports = router;
