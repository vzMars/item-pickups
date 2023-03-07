const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');

router.use(ensureAuth);
router.get('/add', itemController.addForm);
router.post('/add', upload.single('file'), itemController.addItem);

module.exports = router;
