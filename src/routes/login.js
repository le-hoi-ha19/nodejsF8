const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.inputLogin);
router.post('/', loginController.index);

module.exports = router;