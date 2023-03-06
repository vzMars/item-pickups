const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/add', ensureAuth, itemController.addForm);

module.exports = router;
