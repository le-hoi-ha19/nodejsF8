const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterController');

router.post('/', registerController.index);

module.exports = router;