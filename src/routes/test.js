const express = require('express');
const router = express.Router();

const testController = require('../app/controllers/TestController');

router.get('/:slug', testController.show)
router.get('/', testController.index);

module.exports = router;