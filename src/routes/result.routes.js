const express = require('express');
const router = express.Router();
const { resultController } = require('./../controllers');

router.post('/', resultController.addResult);
router.get('/', resultController.getAllByUser)

module.exports = router;
