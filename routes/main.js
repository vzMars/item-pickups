const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getIndex);
router.get('/logout', ensureAuth, authController.logout);

router.use(ensureGuest);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
