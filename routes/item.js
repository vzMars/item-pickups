const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');

router.use(ensureAuth);
router.get('/add', itemController.addForm);
router.get('/:id', itemController.getItem);
router.post('/add', upload.single('file'), itemController.addItem);
router.put('/like/:id', itemController.likeItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;
